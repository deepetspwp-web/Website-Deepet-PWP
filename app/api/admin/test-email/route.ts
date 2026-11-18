import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSettings } from '@/lib/leadsStore';

export async function POST(req: Request) {
    try {
        const settings = await getSettings();
        const recipient = settings.notificationRecipientEmail || 'deepetservices1@gmail.com';
        const displayName = settings.senderDisplayName || 'DeePets Notifications';

        // Check if SMTP credentials exist in env
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return NextResponse.json({
                success: false,
                simulated: true,
                message: `SMTP credentials (SMTP_USER/SMTP_PASS) not configured in .env yet. Would send test notification to: ${recipient}`,
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${displayName}" <${process.env.SMTP_USER}>`,
            to: recipient,
            subject: '🔔 Test Lead Notification - DeePet Services',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
                    <h2 style="color: #003451; margin-top: 0;">Test Email Delivery Verified ✅</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6;">
                        This is a confirmation email sent from your <strong>DeePet Services Admin Panel</strong>.
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
