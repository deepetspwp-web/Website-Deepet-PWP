import parse from "html-react-parser";
import { getSeoForUri } from "@/lib/wp";

interface SeoHeadProps {
    /** WordPress URI to fetch SEO data for, e.g. "home" or "blog/my-post". */
    uri: string;
    /**
     * Title/description used only when the URI has no TeqzWP SEO data
     * (front-end-only pages, or pages not yet configured in WP). When the
     * plugin returns a fullHead, it wins and the fallback is ignored — so
     * there is never a duplicate `<title>`/meta.
     */
    fallback?: { title?: string; description?: string };
}

/**
 * Renders SEO `<head>` markup for a given WordPress URI.
 *
 * - If the TeqzWP SEO plugin returns a `fullHead`, its `<title>`, `<meta>`, and
 *   `<link>` tags are rendered verbatim and hoisted into `<head>` by React 19.
 * - Otherwise it emits the provided `fallback` title/description (if any).
 *
 * This makes WordPress the SEO source of truth wherever it has data, while
 * front-end-only pages keep working via their fallback.
 */
export async function SeoHead({ uri, fallback }: SeoHeadProps) {
    const fullHead = await getSeoForUri(uri);
    if (fullHead) return <>{parse(fullHead)}</>;

    if (!fallback) return null;
    return (
        <>
            {fallback.title ? <title>{fallback.title}</title> : null}
            {fallback.description ? (
                <meta name="description" content={fallback.description} />
            ) : null}
        </>
    );
}
