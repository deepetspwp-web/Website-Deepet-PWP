import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { db, explainError } from '@/lib/firebase/admin';
import { refreshContent } from '@/lib/cms/revalidate';
import { SITE_PAGES, sitePageById } from '@/lib/cms/sitePages';
import type { CmsPageSeo } from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

// GET: SEO for every page of the site (empty fields for pages not set up yet).
export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const snap = await db().collection('seo').get();
        const saved = new Map(snap.docs.map((d) => [d.id, d.data() as Partial<CmsPageSeo>]));
        const pages: CmsPageSeo[] = SITE_PAGES.map((p) => {
            const s = saved.get(p.id) ?? {};
            return {
                id: p.id,
                path: p.path,
                label: p.label,
                title: s.title ?? '',
                description: s.description ?? '',
                ogImage: s.ogImage ?? '',
                noindex: !!s.noindex,
                schemaJson: s.schemaJson ?? '',
                updatedAt: s.updatedAt,
            };
        });
        return NextResponse.json({ success: true, pages });
    } catch (error) {
        console.error('Error loading SEO:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to load SEO') }, { status: 500 });
    }
}

// POST: { id, title, description, ogImage, noindex, schemaJson }
export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const b = await req.json();
        const page = sitePageById(String(b.id));
        if (!page) return NextResponse.json({ success: false, error: 'Unknown page' }, { status: 400 });

        const schemaJson = String(b.schemaJson ?? '').trim();
        if (schemaJson) {
            try {
                JSON.parse(schemaJson);
            } catch {
                return NextResponse.json({ success: false, error: 'Structured data is not valid JSON — check for a missing comma or bracket.' }, { status: 400 });
            }
        }

        const doc: CmsPageSeo = {
            id: page.id,
            path: page.path,
            label: page.label,
            title: String(b.title ?? '').trim(),
            description: String(b.description ?? '').trim(),
            ogImage: String(b.ogImage ?? '').trim(),
            noindex: !!b.noindex,
            schemaJson,
            updatedAt: new Date().toISOString(),
        };
        await db().collection('seo').doc(page.id).set(doc);
        refreshContent('seo');
        return NextResponse.json({ success: true, page: doc });
    } catch (error) {
        console.error('Error saving SEO:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to save SEO') }, { status: 500 });
    }
}
