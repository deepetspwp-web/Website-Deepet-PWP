import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, petType, pet, service, city, pincode, date, timeSlot, source, captchaToken, utm_source, utm_medium, utm_campaign } = body;
    const resolvedPetType = petType || pet || '';

    console.log('Received booking request from:', source, { name, phone });

    // 1. Basic Validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    // 2. Input Sanitization & Spam Detection
    const suspiciousPatterns = [
      /SELECT.*FROM/i,
      /INSERT.*INTO/i,
      /UPDATE.*SET/i,
      /DELETE.*FROM/i,
      /UNION.*SELECT/i,
      /WHERE\s+\d+=\d+/i, // Common SQLi pattern like 2559=2559
      /AND\s+\d+=\d+/i,
      /OR\s+\d+=\d+/i,
      /WAITFOR\s+DELAY/i,
      /--/i, // SQL comment
      /\/\*/i, // SQL comment
      /GTID_SUBSET/i, // Specifically seen in the spam image
      /CONCAT\(/i,
      /ELT\(/i
    ];

    const checkSpam = (text: string) => {
      if (!text) return false;
      return suspiciousPatterns.some(pattern => pattern.test(text));
    };

    if (checkSpam(name) || checkSpam(message) || checkSpam(phone)) {
      console.warn('Spam/Malicious pattern detected:', { name, phone, message });
      return NextResponse.json({ error: 'Invalid input detected' }, { status: 400 });
    }

    // 3. Verify reCAPTCHA
    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping reCAPTCHA verification in development environment');
    } else {
      if (!captchaToken) {
        console.error('reCAPTCHA token is missing');
        return NextResponse.json({ error: 'reCAPTCHA token is missing' }, { status: 400 });
      }

      if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('RECAPTCHA_SECRET_KEY is not defined');
        return NextResponse.json({ error: 'Server configuration error (missing keys)' }, { status: 500 });
      }

      try {
        // Standard POST verification for reCAPTCHA v3
        const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
          console.error('reCAPTCHA verification failed:', verifyData['error-codes'], 'Score:', verifyData.score);
          return NextResponse.json({ 
            error: 'reCAPTCHA verification failed. Please try again or contact us directly.',
            details: verifyData['error-codes'] 
          }, { status: 400 });
        }
      } catch (vError) {
        console.error('Error verifying reCAPTCHA:', vError);
        return NextResponse.json({ error: 'Failed to verify reCAPTCHA' }, { status: 500 });
      }
    }

    // 4. Send Email via SMTP
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP environment variables are not fully configured');
      return NextResponse.json({ error: 'Server configuration error (mail)' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `New Lead from ${source}`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #003451; border-bottom: 2px solid #bfe37f; padding-bottom: 10px;">New Pet Service Inquiry</h2>
        <div style="margin-top: 20px;">
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${city ? `<p><strong>City:</strong> ${city}</p>` : ''}
          ${pincode ? `<p><strong>Pincode:</strong> ${pincode}</p>` : ''}
          ${resolvedPetType ? `<p><strong>Pet Type:</strong> ${resolvedPetType}</p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          ${date ? `<p><strong>Preferred Date:</strong> ${date}</p>` : ''}
          ${timeSlot ? `<p><strong>Preferred Slot:</strong> ${timeSlot}</p>` : ''}
          ${utm_source ? `<p><strong>UTM Source:</strong> ${utm_source}</p>` : ''}
          ${utm_medium ? `<p><strong>UTM Medium:</strong> ${utm_medium}</p>` : ''}
          ${utm_campaign ? `<p><strong>UTM Campaign:</strong> ${utm_campaign}</p>` : ''}
          ${message ? `
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #bfe37f;">
              <strong>Message:</strong><br/>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          ` : ''}
        </div>
        <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
          This lead was verified by reCAPTCHA and screened for malicious content.
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Deepet Services" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_RECIPIENT_EMAIL || 'deepetservices1@gmail.com',
      subject: subject,
      html: htmlContent,
    };

    // 5. Save to Google Sheets
    let googleSheetError: Error | null = null;
    try {
      // Option A: Apps Script Webhook (Prioritized if URL is provided)
      if (process.env.GOOGLE_SCRIPT_WEBHOOK_URL) {
        console.log('Sending to Apps Script Webhook:', process.env.GOOGLE_SCRIPT_WEBHOOK_URL);
        const gsResponse = await fetch(process.env.GOOGLE_SCRIPT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name, phone, email, message, petType: resolvedPetType, service, city, pincode, date, timeSlot, source,
            utm_source: utm_source || '', utm_medium: utm_medium || '', utm_campaign: utm_campaign || '',
            timestamp: new Date().toLocaleString(),
          }),
          redirect: 'follow', // Ensure we follow redirects
        });
        
        console.log('Apps Script Status:', gsResponse.status);
        if (!gsResponse.ok) {
          const errorText = await gsResponse.text();
          console.error('Apps Script Error Response:', errorText);
          throw new Error(`Status ${gsResponse.status}: ${errorText.substring(0, 200)}...`);
        }
        console.log('Apps Script Webhook success');
      } 
      // Option B: Service Account (Checking for non-placeholder values)
      else if (
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.includes('YOUR_') &&
        process.env.GOOGLE_PRIVATE_KEY && !process.env.GOOGLE_PRIVATE_KEY.includes('YOUR_') &&
        process.env.GOOGLE_SHEET_ID && !process.env.GOOGLE_SHEET_ID.includes('YOUR_')
      ) {
        console.log('Using Service Account method');
        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        await sheet.addRow({
          'Name': name,
          'Phone': phone,
          'Email': email || '',
          'Message': message || '',
          'Pet Type': resolvedPetType,
          'Service': service || '',
          'City': city || '',
          'Pincode': pincode || '',
          'Date': date || '',
          'Time Slot': timeSlot || '',
          'Source': source || '',
          'UTM Source': utm_source || '',
          'UTM Medium': utm_medium || '',
          'UTM Campaign': utm_campaign || '',
          'Timestamp': new Date().toLocaleString(),
        });
      } else {
        console.warn('No valid Google Sheets configuration found');
      }
    } catch (gsError) {
      const err = gsError instanceof Error ? gsError : new Error(String(gsError));
      console.error('Error saving to Google Sheets:', err.message);
      googleSheetError = err;
    }

    // 6. Send email (waiting for completion)
    let emailError: Error | null = null;
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (mailErr) {
      const err = mailErr instanceof Error ? mailErr : new Error(String(mailErr));
      console.error('SMTP Error:', err.message);
      emailError = err;
    }

    // 7. Determine Final Response
    if (googleSheetError && emailError) {
      console.error('Both lead capture methods failed');
      return NextResponse.json({
        error: 'Failed to process lead. Please contact us directly.'
      }, { status: 500 });
    }

    if (googleSheetError || emailError) {
      console.warn('Lead partially captured', {
        googleSheetError: googleSheetError?.message,
        emailError: emailError?.message,
      });
      return NextResponse.json({
        message: 'Lead captured',
      }, { status: 200 });
    }

    return NextResponse.json({ message: 'Lead captured successfully' }, { status: 200 });
  } catch (outerError) {
    const err = outerError instanceof Error ? outerError : new Error(String(outerError));
    console.error('CRITICAL Error in route handler:', err.message, err.stack);
    return NextResponse.json({
      error: 'Server error. Please try again.'
    }, { status: 500 });
  }
}
