import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requireAdmin } from '@/lib/adminAuth';
import { explainError, uploadToStorage } from '@/lib/firebase/admin';

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif', 'image/x-icon', 'image/vnd.microsoft.icon']);
const MAX_BYTES = 10 * 1024 * 1024;
const FOLDERS = new Set(['blog', 'gallery', 'site']);

// POST multipart/form-data: file, folder (blog | gallery | site) → { url, path }
export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const form = await req.formData();
        const file = form.get('file');
        const folder = String(form.get('folder') || 'blog');
        if (!(file instanceof File)) return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        if (!ALLOWED.has(file.type)) return NextResponse.json({ success: false, error: 'Only image files can be uploaded' }, { status: 400 });
        if (file.size > MAX_BYTES) return NextResponse.json({ success: false, error: 'Image must be under 10 MB' }, { status: 400 });
        if (!FOLDERS.has(folder)) return NextResponse.json({ success: false, error: 'Invalid folder' }, { status: 400 });

        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+/, '').slice(-80) || 'image';
        const month = new Date().toISOString().slice(0, 7).replace('-', '/');
        const path = `${folder}/${month}/${randomUUID().slice(0, 8)}-${safeName}`;
        const result = await uploadToStorage(path, Buffer.from(await file.arrayBuffer()), file.type);
        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error('Upload error:', error);
        const msg = error instanceof Error ? error.message : 'Upload failed';
        return NextResponse.json({ success: false, error: explainError(error, `Upload failed: ${msg}`) }, { status: 500 });
    }
}
