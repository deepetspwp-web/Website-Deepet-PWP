import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/leadsStore';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const settings = await getSettings();
        const webhookUrl = body.webhookUrl || settings.googleScriptWebhookUrl || process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

        if (!webhookUrl) {
            return NextResponse.json({
                success: false,
                error: 'No Google Apps Script Webhook URL provided. Please enter and save your deployed Webhook URL first.',
            }, { status: 400 });
        }

        // Test payload matching Image 5:
        // Col A: Consultation Code (Unique ID: DEPWEB00n)
        // Col B: Customer Name
        // Col C: Phone Number
        // Col D: Pet Type
        // Col E: Category
        // Col F: Service / Package
        // Col G: Price (₹)
        // Col H: City
        // Col I: Pincode
        // Col J: Message / Preferred Date
        // Col K: Submission Timestamp
        const testPayload = {
            code: 'DEPWEB0099',
            name: 'Test Customer',
            phone: '+919999999999',
            petType: 'Dog',
            category: 'Preventive Wellness',
            service: 'Wellness 360° — Adult Pet',
            price: '4999',
            city: 'Delhi NCR',
            pincode: '110001',
            message: 'Test webhook verification from DeePet Admin Panel',
            timestamp: new Date().toLocaleString('en-IN'),
        };

        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testPayload),
            redirect: 'follow',
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({
                success: false,
                error: `Apps Script returned HTTP ${res.status}: ${errorText.substring(0, 200)}`,
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'Test lead successfully sent to Google Sheet!',
            dataSent: testPayload,
        });
    } catch (error) {
        console.error('Error testing Google Sheet webhook:', error);
        const errMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            success: false,
            error: `Failed to connect to Google Apps Script: ${errMessage}`,
        }, { status: 500 });
    }
}

