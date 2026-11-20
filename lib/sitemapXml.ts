// XML builders for the sitemap routes — one for a sitemap index (the parent
// /sitemap.xml) and one for a regular urlset (each sub-sitemap).
//
// Both emit a `<?xml-stylesheet?>` declaration pointing at `/sitemap.xsl`
// so browsers render a friendly HTML view of the XML. Search engines ignore
// the stylesheet and parse the XML directly per sitemaps.org protocol.
//
// Ported from visaguy.sa.cloudflare. DeePet is English-only and serves
// non-trailing-slash URLs, so the Arabic localisation and trailing-slash
// normalisation from the source are dropped — URLs are built from siteUrl()
// and trusted verbatim.

import { siteUrl } from "./site";
import type { SeoSitemapUrl } from "./cms/types";

export type SitemapUrlEntry = {
  loc: string;
  lastModified?: string | Date | null;
};

export type SitemapIndexEntry = {
  loc: string;
  lastModified?: string | Date | null;
};

const STYLESHEET_HREF = "/sitemap.xsl";

// Escape XML reserved characters so URLs containing `&` (query strings),
// `<`, `>`, or quote characters don't break the document.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIso(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  // Trust stored strings — they're already ISO 8601. Re-parsing and
  // re-formatting risks dropping the timezone offset some hosts send.
  return value;
}

/**
 * Builds a sitemap index document — the top-level `/sitemap.xml` that
 * lists the sub-sitemaps.
 */
export function buildSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const items = entries
    .map((e) => {
      const lastmod = toIso(e.lastModified);
      return [
        "  <sitemap>",
        `    <loc>${escapeXml(e.loc)}</loc>`,
        lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : "",
        "  </sitemap>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<?xml-stylesheet type="text/xsl" href="${STYLESHEET_HREF}"?>`,
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</sitemapindex>",
    "",
  ].join("\n");
}

/**
 * Builds a urlset document — one of the sub-sitemaps. Each entry's `loc`
 * should already be an absolute URL on the public site (use `siteUrl`).
 */
export function buildSitemapUrlsetXml(entries: SitemapUrlEntry[]): string {
  const items = entries
    .map((e) => {
      const lastmod = toIso(e.lastModified);
      return [
        "  <url>",
        `    <loc>${escapeXml(e.loc)}</loc>`,
        lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<?xml-stylesheet type="text/xsl" href="${STYLESHEET_HREF}"?>`,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</urlset>",
    "",
  ].join("\n");
}

// Sitemaps describe pages, not arbitrary endpoints — so only HTTP(S)
// schemes are meaningful in <loc>. `URL.protocol` is canonicalised to
// lowercase with the trailing colon (`https:`), making this check
// case-safe by construction.
const ALLOWED_SITEMAP_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Normalises a sitemap URL. Absolute `https://` URLs are validated and passed
 * through verbatim. Bare-path inputs (no scheme) are anchored to
 * the configured public siteUrl.
 *
 * Any URL whose protocol isn't http(s) (e.g. `mailto:`, `tel:`, `data:`,
 * `javascript:`, `ftp:`) is rejected by returning the empty string, as are
 * inputs that don't parse at all. The caller filters empties out.
 */
export function normaliseUrl(url: string): string {
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    if (!ALLOWED_SITEMAP_PROTOCOLS.has(parsed.protocol)) return "";
    return trimmed;
  } catch {
    return trimmed.startsWith("/") ? siteUrl(trimmed) : "";
  }
}

/**
 * Convert one sitemap bucket's URLs into sitemap entries,
 * validated and anchored to the public host. Rejected entries are dropped.
 */
export function bucketToEntries(urls: SeoSitemapUrl[] | null): SitemapUrlEntry[] {
  return (urls ?? [])
    .map((u) => ({ loc: normaliseUrl(u.url), lastModified: u.lastModified }))
    .filter((entry) => entry.loc !== "");
}

/**
 * De-duplicates entries by `loc`, keeping whichever copy has the freshest
 * `lastModified` (a bucket can list the same URL twice across terms).
 */
export function dedupeByLoc(entries: SitemapUrlEntry[]): SitemapUrlEntry[] {
  const map = new Map<string, SitemapUrlEntry>();
  for (const entry of entries) {
    const existing = map.get(entry.loc);
    if (!existing) {
      map.set(entry.loc, entry);
      continue;
    }
    const a = toIso(entry.lastModified) ?? "";
    const b = toIso(existing.lastModified) ?? "";
    map.set(entry.loc, a > b ? entry : existing);
  }
  return Array.from(map.values());
}
