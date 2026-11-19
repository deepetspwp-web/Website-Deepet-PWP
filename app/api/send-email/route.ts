import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { addLead, getSettings } from '@/lib/leadsStore';
import { sendEmailWithMailjet } from '@/lib/mailjet';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      message,
      petType,
      pet,
      service,
      category,
      price,
      city,
      pincode,
      date,
      timeSlot,
      source = 'Website Form',
      captchaToken,
      utm_source,
      utm_medium,
      utm_campaign
    } = body;

    const resolvedPetType = (petType || pet || 'Dog').charAt(0).toUpperCase() + (petType || pet || 'Dog').slice(1);
    const isContactForm = source.toLowerCase().includes('contact');
    const leadType = isContactForm ? 'contact' : 'consultation';

    // 1. Basic Validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }

    // 2. Input Sanitization & Spam Detection
    const suspiciousPatterns = [
      /SELECT.*FROM/i,
      /INSERT.*INTO/i,
      /UPDATE.*SET/i,
      /DELETE.*FROM/i,
      /UNION.*SELECT/i,
      /WHERE\s+\d+=\d+/i,
      /AND\s+\d+=\d+/i,
      /OR\s+\d+=\d+/i,
      /WAITFOR\s+DELAY/i,
      /--/i,
      /\/\*/i,
      /GTID_SUBSET/i,
      /CONCAT\(/i,
      /ELT\(/i
    ];

    const checkSpam = (text: string) => {
      if (!text) return false;
      return suspiciousPatterns.some(pattern => pattern.test(text));
    };

    if (checkSpam(name) || checkSpam(message || '') || checkSpam(phone)) {
      console.warn('Spam pattern detected:', { name, phone });
      return NextResponse.json({ error: 'Invalid input detected' }, { status: 400 });
    }

    // 3. Resolve Category, Price, and Notes
    const resolvedCategory = category || (isContactForm ? 'General Enquiry' : 'Preventive Wellness');
    const resolvedService = service || (isContactForm ? 'Contact Inquiry' : 'General Consultation');
    const resolvedPrice = price || (isContactForm ? '0' : '999');
    const resolvedDateMessage = [
      date ? `Date: ${date}` : '',
      timeSlot ? `Slot: ${timeSlot}` : '',
      message ? message : ''
    ].filter(Boolean).join(' | ') || (date ? `Preferred date: ${date}` : 'Consultation request');

    // 4. Save to Database & Generate Unique ID: DEPWEB00<N>
    const newLead = await addLead({
      type: leadType,
      name,
      phone,
      email: email || '',
      petType: resolvedPetType,
      category: resolvedCategory,
      service: resolvedService,
      price: resolvedPrice,
      city: city || 'Delhi NCR',
      pincode: pincode || '',
      date: date || '',
      timeSlot: timeSlot || '',
      message: message || '',
      source,
      status: 'Pending',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
    });

    const bookingId = newLead.code;
    console.log(`[Fast Order] Created lead ${bookingId} for ${name} (${phone})`);

    // 5. Build instant HTTP response
    const response = NextResponse.json({
      success: true,
      bookingId,
      code: bookingId,
      message: 'Consultation booking captured successfully!',
    }, { status: 200 });

    // 6. Asynchronous Background Sync (Google Sheets & Email Notifications)
    // Runs in the background so the customer is redirected to the Thank You page in under 300ms!
    (async () => {
      try {
        const settings = await getSettings();

        // Background Task A: Google Sheets Sync (Webhook or Service Account)
        const webhookUrl = settings.googleScriptWebhookUrl || process.env.GOOGLE_SCRIPT_WEBHOOK_URL;
        if (webhookUrl) {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                code: bookingId,
                bookingId: bookingId,
                name,
                phone,
                petType: resolvedPetType,
                category: resolvedCategory,
                service: resolvedService,
                price: resolvedPrice,
                city: city || 'Delhi NCR',
                pincode: pincode || '',
                message: resolvedDateMessage,
                date: date || '',
                timestamp: newLead.timestamp,
                utm_source: utm_source || '',
                utm_medium: utm_medium || '',
                utm_campaign: utm_campaign || '',
              }),
              redirect: 'follow',
            });
            console.log(`[Background] Synced ${bookingId} to Google Sheet Webhook`);
          } catch (webhookErr) {
            console.error('[Background] Google Sheet Webhook error:', webhookErr);
          }
        } else if (
          process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
          process.env.GOOGLE_PRIVATE_KEY &&
          process.env.GOOGLE_SHEET_ID &&
          !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.includes('YOUR_')
        ) {
          try {
            const serviceAccountAuth = new JWT({
              email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
              key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
              scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[0];
            await sheet.addRow({
              'Consultation Code': bookingId,
              'Customer Name': name,
              'Phone Number': phone,
              'Pet Type': resolvedPetType,
              'Category': resolvedCategory,
              'Service / Package': resolvedService,
              'Price (₹)': resolvedPrice,
              'City': city || '',
              'Pincode': pincode || '',
              'Message / Preferred Date': resolvedDateMessage,
              'Submission Timestamp': newLead.timestamp,
            });
          } catch (gsErr) {
            console.error('[Background] Google Sheets service account error:', gsErr);
          }
        }

        // Background Task B: Email Notification Delivery (Mailjet)
        if (settings.enableEmailNotifications) {
          try {
            const recipientEmail = settings.notificationRecipientEmail || 'deepetservices1@gmail.com';
            const senderName = settings.senderDisplayName || 'DeePets Notifications';

            // Escape customer-entered values before putting them in the email HTML.
            const escapeHtml = (v: unknown) =>
              String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
            const e = {
              bookingId: escapeHtml(bookingId), source: escapeHtml(source), name: escapeHtml(name),
              phone: escapeHtml(phone), email: escapeHtml(email), resolvedPetType: escapeHtml(resolvedPetType),
              resolvedCategory: escapeHtml(resolvedCategory), resolvedService: escapeHtml(resolvedService),
              city: escapeHtml(city), pincode: escapeHtml(pincode), date: escapeHtml(date),
              timeSlot: escapeHtml(timeSlot), message: escapeHtml(message),
            };

            const result = await sendEmailWithMailjet({
              to: recipientEmail,
              fromName: senderName,
              subject: `🐾 New Booking [${bookingId}] from ${name} (${city || 'Delhi NCR'})`,
              textContent: [
                `New booking ${bookingId}`,
                `Name: ${name}`,
                `Phone: ${phone}`,
                email ? `Email: ${email}` : '',
                `Pet: ${resolvedPetType}`,
                `Service: ${resolvedService} (${resolvedCategory})`,
                `City: ${city || 'Delhi NCR'} ${pincode || ''}`,
                date ? `Preferred date: ${date} ${timeSlot || ''}` : '',
                message ? `Message: ${message}` : '',
              ].filter(Boolean).join('\n'),
              htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
                  <div style="background: #003451; color: white; padding: 16px 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h2 style="margin: 0; font-size: 20px;">New Consultation Request: ${e.bookingId}</h2>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #bfe37f;">Source: ${e.source}</p>
                  </div>

                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px;">Booking Code:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #65a30d; font-weight: bold;">${e.bookingId}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Customer Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.name}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${e.phone}" style="color: #0284c7; text-decoration: none;">${e.phone}</a></td></tr>
                    ${e.email ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.email}</td></tr>` : ''}
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Pet Type:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.resolvedPetType}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Category:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.resolvedCategory}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Service / Package:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.resolvedService}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">City / Area:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.city || 'Delhi NCR'} ${e.pincode ? `(${e.pincode})` : ''}</td></tr>
                    ${e.date ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Preferred Date:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.date} ${e.timeSlot ? `(${e.timeSlot})` : ''}</td></tr>` : ''}
                    ${e.message ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; vertical-align: top;">Notes/Message:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${e.message}</td></tr>` : ''}
                  </table>

                  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
                    View this lead in your <a href="https://deepetservices.com/admin" style="color: #003451; font-weight: bold;">DeePet Admin Panel</a>
                  </div>
                </div>
              `,
            });
            if (result.success) {
              console.log(`[Background] Sent booking email for ${bookingId} to ${recipientEmail}`);
            } else {
              console.error(`[Background] Mailjet booking email failed for ${bookingId}:`, result.error);
            }
          } catch (mailErr) {
            console.error('[Background] Mailjet notification error:', mailErr);
          }
        }
      } catch (bgErr) {
        console.error('[Background] Execution error:', bgErr);
      }
    })();

    return response;

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('Error in send-email route:', err.message);
    return NextResponse.json({
      error: 'Failed to process booking. Please try again or call us directly.',
    }, { status: 500 });
  }
}
