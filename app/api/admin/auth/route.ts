import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/leadsStore';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, username, password, currentPassword, newUsername, newPassword } = body;
        const settings = await getSettings();

        // Login check
        if (action === 'login') {
            const validUser = settings.adminUsername || '1';
            const validPass = settings.adminPassword || '1';

            if (username === validUser && password === validPass) {
                return NextResponse.json({ success: true, username: validUser });
            }
            return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
        }

        // Change password / credentials
        if (action === 'change_credentials') {
            const validPass = settings.adminPassword || '1';

            if (currentPassword !== validPass) {
                return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
            }

            if (!newPassword || newPassword.trim().length === 0) {
                return NextResponse.json({ success: false, error: 'New password cannot be empty' }, { status: 400 });
            }

            const updatedUser = newUsername && newUsername.trim() ? newUsername.trim() : (settings.adminUsername || '1');
            const updated = await saveSettings({
                adminUsername: updatedUser,
                adminPassword: newPassword.trim(),
            });

            return NextResponse.json({
                success: true,
                message: 'Admin credentials updated successfully!',
                username: updated.adminUsername,
            });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
