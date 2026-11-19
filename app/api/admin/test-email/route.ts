import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/leadsStore';
import { sendEmailWithMailjet } from '@/lib/mailjet';

export async function POST() {
    try {
        const settings = await getSettings();
        const recipient = settings.notificationRecipientEmail || 'deepetservices1@gmail.com';
        const displayName = settings.senderDisplayName || 'DeePets Notifications';

        if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
            return NextResponse.json({
                success: false,
                simulated: true,
                message: `Mailjet credentials (MAILJET_API_KEY/MAILJET_SECRET_KEY) not configured in .env yet. Would send test notification to: ${recipient}`,
            });
        }

        const result = await sendEmailWithMailjet({
            to: recipient,
            fromName: displayName,
            subject: '🔔 Test Lead Notification - DeePet Services',
            textContent: `Test email from the DeePet Services admin panel. Booking notifications will be sent to ${recipient}.`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
                    <h2 style="color: #003451; margin-top: 0;">Test Email Delivery Verified ✅</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6;">
                        This is a confirmation email sent from your <strong>DeePet Services Admin Panel</strong> via Mailjet.
                    </p>
                    <div style="background: #f8fafc; border-left: 4px solid #95c93d; padding: 16px; margin: 20px 0; border-radius: 8px;">
                        <p style="margin: 4px 0;"><strong>Recipient:</strong> ${recipient}</p>
                        <p style="margin: 4px 0;"><strong>Sender Display Name:</strong> ${displayName}</p>
                        <p style="margin: 4px 0;"><strong>Status:</strong> Active & Ready for incoming consultations</p>
                    </div>
                    <p style="font-size: 13px; color: #94a3b8;">DeePet Services Lead Notification System</p>
                </div>
            `,
        });

        if (!result.success) {
            return NextResponse.json({
                success: false,
                error: `Failed to send test email: ${result.error}`,
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: `Test email successfully sent to ${recipient}!`,
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        const errMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            success: false,
            error: `Failed to send test email: ${errMessage}`,
        }, { status: 500 });
    }
}
