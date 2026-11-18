import { wpFetch } from "./client";
import type {
    SeoSitemapEntry,
    SeoSitemapTaxonomyEntry,
    SitemapTypeBucket,
    ThemeOptions,
    WPGallery,
    WPPage,
    WPPostFull,
    WPPostListItem,
} from "./types";

const THEME_OPTIONS_QUERY = /* GraphQL */ `
    query ThemeOptions {
        teqzwpThemeOptions {
            analytics {
                gtmId
            }
            company {
                favicon
                logoVar1
                logoVar2
                logoVar3
                logoVar4
                siteTitle
            }
            contact {
                address
                email
                latitude
                longitude
                phones {
                    name
                    phone
                }
            }
            socialMedia {
                iconClass
                platformName
                url
            }
        }
    }
`;

const POSTS_LIST_QUERY = /* GraphQL */ `
    query Posts($first: Int!) {
        posts(first: $first) {
            nodes {
                slug
                title
                excerpt
                date
                featuredImage {
                    node {
                        altText
                        mediaItemUrl
                    }
                }
                author {
                    node {
                        name
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
`;

const POST_BY_SLUG_QUERY = /* GraphQL */ `
    query Post($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            title
            content
            date
            featuredImage {
                node {
                    altText
                    mediaItemUrl
                }
            }
            author {
                node {
                    name
                }
            }
            categories {
                nodes {
                    name
                    slug
                }
            }
            tags {
                nodes {
                    name
                    slug
                }
            }
        }
    }
`;

const GALLERY_QUERY = /* GraphQL */ `
    query Gallery {
        deePetsGallery {
            galleryDetails {
                galleryImages(first: 50) {
                    nodes {
                        altText
                        mediaItemUrl
                    }
                }
            }
        }
    }
`;

const PAGE_BY_URI_QUERY = /* GraphQL */ `
    query PageByUri($uri: String!) {
        pageBy(uri: $uri) {
            title
            content
        }
    }
`;

export async function getThemeOptions(): Promise<ThemeOptions | null> {
    const data = await wpFetch<{ teqzwpThemeOptions: ThemeOptions | null }>(
        THEME_OPTIONS_QUERY,
        {},
        { tags: ["theme-options"] },
    );
    return data?.teqzwpThemeOptions ?? null;
}

export async function getPosts(first = 12): Promise<WPPostListItem[]> {
    const data = await wpFetch<{ posts: { nodes: WPPostListItem[] } | null }>(
        POSTS_LIST_QUERY,
        { first },
        { tags: ["posts"] },
    );
    return data?.posts?.nodes ?? [];
}

export async function getPostBySlug(
    slug: string,
): Promise<WPPostFull | null> {
    const data = await wpFetch<{ post: WPPostFull | null }>(
        POST_BY_SLUG_QUERY,
        { slug },
        { tags: [`post:${slug}`] },
    );
    return data?.post ?? null;
}

export async function getGalleryImages() {
    const data = await wpFetch<{ deePetsGallery: WPGallery | null }>(
        GALLERY_QUERY,
        {},
        { tags: ["gallery"] },
    );
    return data?.deePetsGallery?.galleryDetails?.galleryImages?.nodes ?? [];
}

export async function getPageByUri(uri: string): Promise<WPPage | null> {
    const data = await wpFetch<{ pageBy: WPPage | null }>(
        PAGE_BY_URI_QUERY,
        { uri },
        { tags: [`page:${uri}`] },
    );
    return data?.pageBy ?? null;
}

// ---------------------------------------------------------------------------
// TeqzWP SEO plugin
// ---------------------------------------------------------------------------

const SEO_FOR_URI_QUERY = /* GraphQL */ `
    query SeoForUri($uri: String!) {
        teqzwpSeoForUri(uri: $uri) {
            fullHead
        }
    }
`;

const SEO_SITEMAP_QUERY = /* GraphQL */ `
    query SeoSitemap {
        teqzwpSeo {
            sitemapXml {
                lastModified
                postType
                urls {
                    lastModified
                    url
                }
            }
        }
    }
`;

const SEO_ROBOTS_QUERY = /* GraphQL */ `
    query SeoRobots {
        teqzwpSeo {
            robotsTxt
        }
    }
`;

const SEO_LLMS_QUERY = /* GraphQL */ `
    query SeoLlms {
        teqzwpSeo {
            llmsTxt
        }
    }
`;

/**
 * Returns the raw `<head>` markup (title, meta, canonical, OG, schema, etc.)
 * generated by the TeqzWP SEO plugin for a given WordPress URI.
 */
export async function getSeoForUri(uri: string): Promise<string | null> {
    const data = await wpFetch<{
        teqzwpSeoForUri: { fullHead: string | null } | null;
    }>(SEO_FOR_URI_QUERY, { uri }, { tags: [`seo:${uri}`] });
    return data?.teqzwpSeoForUri?.fullHead ?? null;
}

export async function getSeoSitemap(): Promise<SeoSitemapEntry[]> {
    const data = await wpFetch<{
        teqzwpSeo: { sitemapXml: SeoSitemapEntry[] | null } | null;
    }>(SEO_SITEMAP_QUERY, {}, { tags: ["seo-sitemap"] });
    return data?.teqzwpSeo?.sitemapXml ?? [];
}

const SEO_SITEMAP_TAXONOMY_QUERY = /* GraphQL */ `
    query SeoSitemapTaxonomy {
        teqzwpSeo {
            sitemapTaxonomyXml {
                lastModified
                taxonomyType
                urls {
                    lastModified
                    url
                }
            }
        }
    }
`;

export async function getSeoSitemapTaxonomy(): Promise<SeoSitemapTaxonomyEntry[]> {
    const data = await wpFetch<{
        teqzwpSeo: { sitemapTaxonomyXml: SeoSitemapTaxonomyEntry[] | null } | null;
    }>(SEO_SITEMAP_TAXONOMY_QUERY, {}, { tags: ["seo-sitemap-taxonomy"] });
    return data?.teqzwpSeo?.sitemapTaxonomyXml ?? [];
}

// Child-sitemap path aliases (e.g. a plural CPT name → singular route slug).
// Empty for DeePet; kept for parity so adding one is a one-line change.
const SITEMAP_TYPE_ALIASES: Record<string, string> = {};
const aliasSitemapType = (t: string): string => SITEMAP_TYPE_ALIASES[t] ?? t;

/**
 * All child-sitemap buckets — post types + taxonomies — fetched concurrently
 * and normalised to a unified `{ type, lastModified, urls }` shape. Drives
 * both the sitemap index and the dynamic /sitemap/[type] route.
 */
export async function getAllSitemapBuckets(): Promise<SitemapTypeBucket[]> {
    const [posts, taxonomies] = await Promise.all([
        getSeoSitemap(),
        getSeoSitemapTaxonomy(),
    ]);
    return [
        ...posts.map((b) => ({
            type: aliasSitemapType(b.postType),
            lastModified: b.lastModified,
            urls: b.urls,
        })),
        ...taxonomies.map((b) => ({
            type: aliasSitemapType(b.taxonomyType),
            lastModified: b.lastModified,
            urls: b.urls,
        })),
    ];
}

export async function getRobotsTxt(): Promise<string | null> {
    const data = await wpFetch<{
        teqzwpSeo: { robotsTxt: string | null } | null;
    }>(SEO_ROBOTS_QUERY, {}, { tags: ["seo-robots"] });
    return data?.teqzwpSeo?.robotsTxt ?? null;
}

export async function getLlmsTxt(): Promise<string | null> {
    const data = await wpFetch<{
        teqzwpSeo: { llmsTxt: string | null } | null;
    }>(SEO_LLMS_QUERY, {}, { tags: ["seo-llms"] });
    return data?.teqzwpSeo?.llmsTxt ?? null;
}
