import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAdmin } from '@/lib/adminAuth';
import { explainError, db } from '@/lib/firebase/admin';
import { refreshContent } from '@/lib/cms/revalidate';
import type { CmsSiteConfig } from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

const str = (v: unknown) => (typeof v === 'string' ? v : '');

export async function GET() {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const snap = await db().collection('config').doc('site').get();
        return NextResponse.json({ success: true, site: snap.data() ?? null });
    } catch (error) {
        console.error('Error loading site config:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to load website info') }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    try {
        const b = await req.json();
        const site: CmsSiteConfig = {
            analytics: { gtmId: str(b.analytics?.gtmId).trim() },
            company: {
                siteTitle: str(b.company?.siteTitle),
                favicon: str(b.company?.favicon),
                logoVar1: str(b.company?.logoVar1),
                logoVar2: str(b.company?.logoVar2),
                logoVar3: str(b.company?.logoVar3),
                logoVar4: str(b.company?.logoVar4),
            },
            contact: {
                address: str(b.contact?.address),
                email: str(b.contact?.email),
                latitude: str(b.contact?.latitude),
                longitude: str(b.contact?.longitude),
                phones: Array.isArray(b.contact?.phones)
                    ? b.contact.phones
                          .map((p: { name?: unknown; phone?: unknown }) => ({ name: str(p?.name).trim(), phone: str(p?.phone).trim() }))
                          .filter((p: { name: string; phone: string }) => p.name && p.phone)
                    : [],
            },
            socialMedia: Array.isArray(b.socialMedia)
                ? b.socialMedia
                      .map((s: { platformName?: unknown; url?: unknown; iconClass?: unknown }) => ({
                          platformName: str(s?.platformName).trim(),
                          url: str(s?.url).trim(),
                          iconClass: str(s?.iconClass),
                      }))
                      .filter((s: { platformName: string; url: string }) => s.platformName && s.url)
                : [],
            robotsTxt: str(b.robotsTxt),
            llmsTxt: str(b.llmsTxt),
        };
        await db().collection('config').doc('site').set({ ...site, updatedAt: FieldValue.serverTimestamp() });
        refreshContent('site');
        return NextResponse.json({ success: true, site });
    } catch (error) {
        console.error('Error saving site config:', error);
        return NextResponse.json({ success: false, error: explainError(error, 'Failed to save website info') }, { status: 500 });
    }
}
