import { getSettings } from './leadsStore';

export interface SendEmailOptions {
    to: string;
    toName?: string;
    fromEmail?: string;
    fromName?: string;
    subject: string;
    htmlContent: string;
    textContent?: string;
}

export interface MailjetResult {
    success: boolean;
    messageId?: string | number;
    error?: string;
}

/**
 * Sends an email via Mailjet REST API v3.1.
 * Fast, lightweight, non-blocking HTTP call without heavy SMTP handshakes.
 */
export async function sendEmailWithMailjet(options: SendEmailOptions): Promise<MailjetResult> {
    try {
        const settings = await getSettings();

        const apiKey = process.env.MAILJET_API_KEY;
        const secretKey = process.env.MAILJET_SECRET_KEY;

        // Must be a sender address verified in Mailjet (Account > Senders & Domains).
        const senderEmail =
            options.fromEmail ||
            process.env.MAILJET_SENDER_EMAIL ||
            'contact@deepetservices.com';

        const senderName =
            options.fromName ||
            settings.senderDisplayName ||
            'DeePets Notifications';

        if (!apiKey || !secretKey) {
            console.warn('[Mailjet] API Key or Secret Key missing');
            return { success: false, error: 'Mailjet API credentials missing' };
        }

        const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${secretKey}`).toString('base64');

        const payload = {
            Messages: [
                {
                    From: {
                        Email: senderEmail,
                        Name: senderName,
                    },
                    To: [
                        {
                            Email: options.to,
                            Name: options.toName || 'DeePets Admin',
                        },
                    ],
                    Subject: options.subject,
                    TextPart: options.textContent || '',
                    HTMLPart: options.htmlContent,
                },
            ],
        };

        const res = await fetch('https://api.mailjet.com/v3.1/send', {
            method: 'POST',
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errBody = await res.text().catch(() => '');
            console.error(`[Mailjet] API responded with HTTP ${res.status}:`, errBody);
            return {
                success: false,
                error: `Mailjet HTTP ${res.status}: ${errBody || res.statusText}`,
            };
        }

        const data = await res.json();
        const firstMsg = data.Messages?.[0];

        if (firstMsg?.Status === 'success') {
            const msgId = firstMsg.To?.[0]?.MessageID;
            console.log(`[Mailjet] Email successfully sent to ${options.to}. MessageID: ${msgId}`);
            return { success: true, messageId: msgId };
        } else {
            const errors = firstMsg?.Errors?.map((e: any) => e.ErrorMessage).join(', ');
            console.error('[Mailjet] Send failed:', errors || data);
            return { success: false, error: errors || 'Mailjet message delivery failed' };
        }
    } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error('[Mailjet] Network or execution error:', errorMsg);
        return { success: false, error: errorMsg };
    }
}

