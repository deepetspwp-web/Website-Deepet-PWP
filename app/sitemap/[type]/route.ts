// Child sitemap served at /sitemap/<type>.xml — "post" (blog posts) or
// "page" (site pages not hidden in Admin → SEO).

import { getAllSitemapBuckets } from "@/lib/cms";
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
