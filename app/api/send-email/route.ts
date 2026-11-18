import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { addLead, getSettings } from '@/lib/leadsStore';

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

    console.log(`Received ${leadType} request from: ${source}`, { name, phone });

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
      console.warn('Spam/Malicious pattern detected:', { name, phone, message });
      return NextResponse.json({ error: 'Invalid input detected' }, { status: 400 });
    }

    // 3. Verify reCAPTCHA
    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping reCAPTCHA verification in development environment');
    } else if (process.env.RECAPTCHA_SECRET_KEY) {
      try {
        if (!captchaToken || captchaToken === 'dev-token') {
          console.warn('Captcha token missing in production');
        } else {
          const recaptchaRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
            { method: 'POST' }
          );
          const recaptchaData = await recaptchaRes.json();
          if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.4)) {
            console.warn('reCAPTCHA failed or low score:', recaptchaData);
            return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 400 });
          }
        }
      } catch (captchaErr) {
        console.error('reCAPTCHA verification error:', captchaErr);
      }
    }

    // 4. Resolve Category and Price
    const resolvedCategory = category || (isContactForm ? 'General Enquiry' : 'Preventive Wellness');
    const resolvedService = service || (isContactForm ? 'Contact Inquiry' : 'General Consultation');
    const resolvedPrice = price || (isContactForm ? '0' : '999');
    const resolvedDateMessage = [
      date ? `Date: ${date}` : '',
      timeSlot ? `Slot: ${timeSlot}` : '',
      message ? message : ''
    ].filter(Boolean).join(' | ') || (date ? `Preferred date: ${date}` : 'Consultation request');

    // 5. Save to Admin Local Leads Store & Generate Unique ID: DEPWEB00<N>
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
    console.log(`Assigned Unique Booking Code: ${bookingId}`);

    // Load dynamic settings from Admin Panel
    const settings = await getSettings();

    // 6. Save to Google Sheets (Apps Script Webhook matching Image 5: Columns A to K)
    const webhookUrl = settings.googleScriptWebhookUrl || process.env.GOOGLE_SCRIPT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        console.log(`Sending lead ${bookingId} to Google Sheet Webhook`);
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
        console.log(`Google Sheet Webhook success for ${bookingId}`);
      } catch (webhookErr) {
        console.error('Google Sheet Webhook sync error:', webhookErr);
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
        console.error('Google Sheets service account error:', gsErr);
      }
    }

    // 7. Send Email Notification (if enabled)
    if (settings.enableEmailNotifications && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const recipientEmail = settings.notificationRecipientEmail || 'deepetservices1@gmail.com';
        const senderName = settings.senderDisplayName || 'DeePets Notifications';

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${senderName}" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          subject: `🐾 New Booking [${bookingId}] from ${name} (${city || 'Delhi NCR'})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
              <div style="background: #003451; color: white; padding: 16px 20px; border-radius: 12px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 20px;">New Consultation Request: ${bookingId}</h2>
                <p style="margin: 4px 0 0; font-size: 13px; color: #bfe37f;">Source: ${source}</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px;">Booking Code:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #65a30d; font-weight: bold;">${bookingId}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Customer Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${name}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></td></tr>
                ${email ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${email}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Pet Type:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${resolvedPetType}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Category:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${resolvedCategory}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Service / Package:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${resolvedService}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">City / Area:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${city || 'Delhi NCR'} ${pincode ? `(${pincode})` : ''}</td></tr>
                ${date ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Preferred Date:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${date} ${timeSlot ? `(${timeSlot})` : ''}</td></tr>` : ''}
                ${message ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; vertical-align: top;">Notes/Message:</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${message}</td></tr>` : ''}
              </table>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
                View and manage this lead in your <a href="https://deepetservices.com/admin" style="color: #003451; font-weight: bold;">DeePet Admin Panel</a>
              </div>
            </div>
          `,
        });
        console.log(`Email notification sent to ${recipientEmail}`);
      } catch (mailErr) {
        console.error('SMTP notification error:', mailErr);
      }
    }

    // 8. Always return the unique Booking ID and Code so the frontend can redirect to /thank-you?bookingId=DEPWEB00n
    return NextResponse.json({
      success: true,
      bookingId,
      code: bookingId,
      message: 'Consultation booking captured successfully!',
    }, { status: 200 });

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('CRITICAL Error in send-email route:', err.message);
    return NextResponse.json({
      error: 'Failed to process booking. Please try again or call us directly.',
    }, { status: 500 });
  }
}
