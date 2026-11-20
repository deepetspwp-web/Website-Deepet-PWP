import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/adminAuth';
import { explainError, db } from '@/lib/firebase/admin';
import { refreshContent } from '@/lib/cms/revalidate';

export const dynamic = 'force-dynamic';

// Editable legal pages. Add more here if other pages should be editable.
const EDITABLE_PAGES = [
    { uri: 'privacy-policy', label: 'Privacy Policy' },
    { uri: 'terms-service', label: 'Terms of Service' },
];

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const pages = await Promise.all(
            EDITABLE_PAGES.map(async ({ uri, label }) => {
                const data = (await db().collection('pages').doc(uri).get()).data();
                return { uri, label, title: data?.title ?? label, content: data?.content ?? '' };
            }),
        );
        return NextResponse.json({ success: true, pages });
    } catch (error) {
        console.error('Error loading pages:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to load pages') }, { status: 500 });
    }
}

// POST { uri, title, content }
export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { uri, title, content } = await req.json();
        if (!EDITABLE_PAGES.some((p) => p.uri === uri)) {
            return NextResponse.json({ success: false, error: 'Unknown page' }, { status: 400 });
        }
        await db().collection('pages').doc(uri).set({
            uri,
            title: String(title ?? ''),
            content: String(content ?? ''),
            updatedAt: FieldValue.serverTimestamp(),
        });
        refreshContent('pages');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving page:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to save page') }, { status: 500 });
    }
}
