// Parent sitemap — the index that links to one sub-sitemap per type the
// teqzwp-seo plugin reports. Fully data-driven: it lists exactly the buckets
// the `teqzwpSeo.sitemapXml` (+ taxonomy) query returns (whatever is enabled
// in WP), nothing hard-coded. Disable a type in WP → its bucket disappears →
// it drops from the index; enable a taxonomy → it appears automatically.
//
// Served publicly at `/sitemap.xml` via a rewrite in next.config.ts (Next
// reserves the literal `/sitemap.xml` route for its metadata system, so the
// handler lives under /api/sitemap). Each child is `/sitemap/<type>.xml`,
// handled by the dynamic app/sitemap/[type] route.

import { getAllSitemapBuckets } from "@/lib/wp";
import { siteUrl } from "@/lib/site";
import { buildSitemapIndexXml, type SitemapIndexEntry } from "@/lib/sitemapXml";

// force-dynamic so the index reflects WP edits between deploys; the underlying
// GraphQL fetch is still ISR-cached (revalidate 600 in wpFetch).
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const buckets = await getAllSitemapBuckets().catch(() => []);
  const now = new Date().toISOString();

  const entries: SitemapIndexEntry[] = buckets
    // Skip empty buckets so the index doesn't link to an empty sub-sitemap.
    .filter((b) => (b.urls?.length ?? 0) > 0)
    .map((b) => ({
      loc: siteUrl(`/sitemap/${b.type}.xml`),
      lastModified: b.lastModified ?? now,
    }));

  return new Response(buildSitemapIndexXml(entries), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
