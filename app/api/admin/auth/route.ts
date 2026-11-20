import { NextResponse } from 'next/server';
import { getSettings, getStoredSettings, saveCredentials } from '@/lib/leadsStore';
import {
    clearSession,
    createSession,
    getSession,
    hashPassword,
    verifyPassword,
} from '@/lib/adminAuth';

function storedHash(s: Awaited<ReturnType<typeof getStoredSettings>>) {
    return s.adminPasswordHash || s.adminPassword || '1';
}

// GET: is the current browser signed in?
export async function GET() {
    const session = await getSession();
    return NextResponse.json({ success: true, authenticated: !!session, username: session?.username ?? null });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, username, password, currentPassword, newUsername, newPassword } = body;
        const settings = await getStoredSettings();

        if (action === 'login') {
            const validUser = settings.adminUsername || '1';
            if (username === validUser && verifyPassword(String(password ?? ''), storedHash(settings))) {
                // Upgrade a legacy plaintext password to a hash on first login.
                if (!settings.adminPasswordHash) {
                    await saveCredentials(validUser, hashPassword(String(password)));
                }
                await createSession(validUser);
                return NextResponse.json({ success: true, username: validUser });
            }
            return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
        }

        if (action === 'logout') {
            await clearSession();
            return NextResponse.json({ success: true });
        }

        if (action === 'change_credentials') {
            if (!(await getSession())) {
                return NextResponse.json({ success: false, error: 'Not signed in' }, { status: 401 });
            }
            if (!verifyPassword(String(currentPassword ?? ''), storedHash(settings))) {
                return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
            }
            if (!newPassword || String(newPassword).trim().length < 6) {
                return NextResponse.json({ success: false, error: 'New password must be at least 6 characters' }, { status: 400 });
            }
            const updatedUser = newUsername && String(newUsername).trim() ? String(newUsername).trim() : (settings.adminUsername || '1');
            await saveCredentials(updatedUser, hashPassword(String(newPassword).trim()));
            await createSession(updatedUser);
            const fresh = await getSettings();
            return NextResponse.json({
                success: true,
                message: 'Admin credentials updated successfully!',
                username: fresh.adminUsername,
            });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
