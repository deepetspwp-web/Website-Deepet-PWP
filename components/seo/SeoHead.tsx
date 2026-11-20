import { getPageSeo } from "@/lib/cms";
import { SITE_URL, siteUrl } from "@/lib/site";
import { sitePageById } from "@/lib/cms/sitePages";

interface SeoHeadProps {
    /** Page id from lib/cms/sitePages.ts, e.g. "home" or "pet-boarding". */
    uri: string;
    /** Used when the page has no SEO saved in Admin → SEO yet. */
    fallback?: { title?: string; description?: string };
}

/**
 * Renders the page's search & share tags (title, description, canonical,
 * robots, Open Graph, Twitter, JSON-LD) from Admin → SEO. React 19 hoists
 * these tags into <head>.
 */
export async function SeoHead({ uri, fallback }: SeoHeadProps) {
    const seo = await getPageSeo(uri);
    const title = seo?.title || fallback?.title;
    const description = seo?.description || fallback?.description;
    const path = seo?.path || sitePageById(uri)?.path || `/${uri}`;
    const url = path === "/" ? SITE_URL : siteUrl(path);
    const robots = seo?.noindex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

    let schema: string | null = null;
    if (seo?.schemaJson?.trim()) {
        try {
            // Re-serialise so only valid JSON is ever printed into the page.
            schema = JSON.stringify(JSON.parse(seo.schemaJson)).replace(/</g, "\\u003c");
        } catch {
            schema = null;
        }
    }

    return (
        <>
            {title ? <title>{title}</title> : null}
            {description ? <meta name="description" content={description} /> : null}
            {seo ? <link rel="canonical" href={url} /> : null}
            {seo ? <meta name="robots" content={robots} /> : null}
            {seo ? (
                <>
                    <meta property="og:type" content="website" />
                    {title ? <meta property="og:title" content={title} /> : null}
                    {description ? <meta property="og:description" content={description} /> : null}
                    <meta property="og:url" content={url} />
                    <meta property="og:site_name" content="DeePet Services" />
                    <meta property="og:locale" content="en_IN" />
                    {seo.ogImage ? <meta property="og:image" content={seo.ogImage} /> : null}
                    <meta name="twitter:card" content="summary_large_image" />
                    {title ? <meta name="twitter:title" content={title} /> : null}
                    {description ? <meta name="twitter:description" content={description} /> : null}
                    {seo.ogImage ? <meta name="twitter:image" content={seo.ogImage} /> : null}
                </>
            ) : null}
            {schema ? (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
            ) : null}
        </>
    );
}
