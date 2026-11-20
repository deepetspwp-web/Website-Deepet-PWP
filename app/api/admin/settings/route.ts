import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getSettings, saveSettings } from '@/lib/leadsStore';

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const settings = await getSettings();
        return NextResponse.json({ success: true, settings });
    } catch (error) {
        console.error('Error getting settings:', error);
        return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
        const body = await req.json();
        const updated = await saveSettings(body);
        return NextResponse.json({ success: true, settings: updated });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}

