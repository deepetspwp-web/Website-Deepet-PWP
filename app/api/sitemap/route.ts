// Parent sitemap: links to /sitemap/post.xml (blog posts) and
// /sitemap/page.xml (site pages), both generated from the admin-managed data.
//
// Served publicly at `/sitemap.xml` via a rewrite in next.config.ts (Next
// reserves the literal `/sitemap.xml` route for its metadata system).

import { getAllSitemapBuckets } from "@/lib/cms";
import { siteUrl } from "@/lib/site";
import { buildSitemapIndexXml, type SitemapIndexEntry } from "@/lib/sitemapXml";

// force-dynamic so new posts appear right away; reads are cached in lib/cms.
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
