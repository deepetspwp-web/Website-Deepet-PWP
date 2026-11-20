import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/adminAuth';
import { explainError, db, deleteFromStorage } from '@/lib/firebase/admin';
import { refreshContent } from '@/lib/cms/revalidate';
import type { CmsPost } from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

function slugify(value: string): string {
    return value
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 120);
}

function slugifyTerms(names: unknown) {
    if (!Array.isArray(names)) return [];
    return names
        .map((n) => (typeof n === 'string' ? n : (n as { name?: string })?.name ?? ''))
        .map((n) => n.trim())
        .filter(Boolean)
        .map((name) => ({ name, slug: slugify(name) }));
}

// GET: every post (drafts included), newest first. ?slug=x returns one post.
export async function GET(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const slug = new URL(req.url).searchParams.get('slug');
        if (slug) {
            const snap = await db().collection('posts').doc(slug).get();
            if (!snap.exists) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
            return NextResponse.json({ success: true, post: snap.data() });
        }
        const snap = await db().collection('posts').select('slug', 'title', 'date', 'status', 'featuredImage', 'categories').get();
        const posts = snap.docs
            .map((d) => d.data())
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return NextResponse.json({ success: true, posts });
    } catch (error) {
        console.error('Error loading posts:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to load posts') }, { status: 500 });
    }
}

// POST: create or update a post. Body: CmsPost fields + optional originalSlug (when renaming).
export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const body = await req.json();
        const title = String(body.title ?? '').trim();
        if (!title) return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });

        const slug = slugify(String(body.slug || title));
        if (!slug) return NextResponse.json({ success: false, error: 'Invalid URL slug' }, { status: 400 });
        const originalSlug = body.originalSlug ? String(body.originalSlug) : null;

        const col = db().collection('posts');
        if (slug !== originalSlug && (await col.doc(slug).get()).exists) {
            return NextResponse.json({ success: false, error: `A post with the URL "/blog/${slug}" already exists` }, { status: 409 });
        }

        const now = new Date().toISOString();
        const post: CmsPost = {
            slug,
            title,
            excerpt: String(body.excerpt ?? ''),
            content: String(body.content ?? ''),
            date: body.date ? new Date(body.date).toISOString() : now,
            modified: now,
            status: body.status === 'draft' ? 'draft' : 'published',
            featuredImage: body.featuredImage?.url
                ? { url: String(body.featuredImage.url), alt: String(body.featuredImage.alt ?? ''), path: body.featuredImage.path || undefined }
                : null,
            author: String(body.author || 'DeePet'),
            categories: slugifyTerms(body.categories),
            tags: slugifyTerms(body.tags),
            seo: {
                title: String(body.seo?.title ?? ''),
                description: String(body.seo?.description ?? ''),
            },
        };

        await col.doc(slug).set({ ...post, updatedAt: FieldValue.serverTimestamp() });
        if (originalSlug && originalSlug !== slug) await col.doc(originalSlug).delete();

        refreshContent('posts');
        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error('Error saving post:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to save post') }, { status: 500 });
    }
}

// DELETE ?slug=x
export async function DELETE(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const slug = new URL(req.url).searchParams.get('slug');
        if (!slug) return NextResponse.json({ success: false, error: 'Missing slug' }, { status: 400 });
        const ref = db().collection('posts').doc(slug);
        const snap = await ref.get();
        if (!snap.exists) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        await ref.delete();
        await deleteFromStorage((snap.data() as CmsPost).featuredImage?.path);
        refreshContent('posts');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to delete post') }, { status: 500 });
    }
}
