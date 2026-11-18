// Dynamic per-type sub-sitemap, served at /sitemap/<type>.xml (e.g.
// /sitemap/post.xml, /sitemap/page.xml). One handler covers every type the
// teqzwp-seo plugin reports — no per-type route files — so it auto-adapts to
// whatever is enabled in WP.
//
// Emits ONLY the URLs from the `teqzwpSeo.sitemapXml` (+ taxonomy) query for
// the matching bucket, validated and anchored to the public host. No
// hard-coded static or archive entries.

import { getAllSitemapBuckets } from "@/lib/wp";
import {
  buildSitemapUrlsetXml,
  bucketToEntries,
  dedupeByLoc,
} from "@/lib/sitemapXml";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> },
): Promise<Response> {
  const { type } = await params;
  // The route segment carries a `.xml` suffix (keeps the file-like URL); the
  // bucket key is the bare type (post type or taxonomy).
  const sitemapType = type.replace(/\.xml$/i, "");

  const buckets = await getAllSitemapBuckets().catch(() => []);
  const bucket = buckets.find((b) => b.type === sitemapType);

  // Unknown/disabled type → empty (but valid) urlset rather than a 404.
  const entries = bucket ? dedupeByLoc(bucketToEntries(bucket.urls)) : [];

  return new Response(buildSitemapUrlsetXml(entries), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
