import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/adminAuth';
import { explainError, db, deleteFromStorage } from '@/lib/firebase/admin';
import { refreshContent } from '@/lib/cms/revalidate';

export const dynamic = 'force-dynamic';

const col = () => db().collection('gallery');

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const snap = await col().orderBy('order', 'asc').get();
        return NextResponse.json({ success: true, items: snap.docs.map((d) => ({ ...d.data(), id: d.id })) });
    } catch (error) {
        console.error('Error loading gallery:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to load gallery') }, { status: 500 });
    }
}

// POST { url, alt, path } — adds a photo at the end of the gallery.
export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { url, alt, path } = await req.json();
        if (!url) return NextResponse.json({ success: false, error: 'Missing image url' }, { status: 400 });
        const last = await col().orderBy('order', 'desc').limit(1).get();
        const order = last.empty ? 0 : (last.docs[0].data().order ?? 0) + 1;
        const ref = await col().add({ url, alt: alt || '', path: path || '', order, createdAt: FieldValue.serverTimestamp() });
        refreshContent('gallery');
        return NextResponse.json({ success: true, item: { id: ref.id, url, alt: alt || '', path: path || '', order } });
    } catch (error) {
        console.error('Error adding gallery item:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to add photo') }, { status: 500 });
    }
}

// PATCH { items: [{ id, alt, order }] } — saves captions and order.
export async function PATCH(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const { items } = await req.json();
        if (!Array.isArray(items)) return NextResponse.json({ success: false, error: 'Missing items' }, { status: 400 });
        const batch = db().batch();
        for (const it of items) {
            if (!it?.id) continue;
            batch.update(col().doc(String(it.id)), { alt: String(it.alt ?? ''), order: Number(it.order) || 0 });
        }
        await batch.commit();
        refreshContent('gallery');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating gallery:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to save gallery') }, { status: 500 });
    }
}

// DELETE ?id=x
export async function DELETE(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const id = new URL(req.url).searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
        const ref = col().doc(id);
        const snap = await ref.get();
        if (!snap.exists) return NextResponse.json({ success: false, error: 'Photo not found' }, { status: 404 });
        await ref.delete();
        await deleteFromStorage(snap.data()?.path);
        refreshContent('gallery');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting gallery item:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to delete photo') }, { status: 500 });
    }
}
