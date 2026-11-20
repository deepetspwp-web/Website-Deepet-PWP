import "server-only";
import { unstable_cache } from "next/cache";
import { db, isFirebaseConfigured } from "@/lib/firebase/admin";
import { SITE_URL, siteUrl } from "@/lib/site";
import { SITE_PAGES } from "./sitePages";
import type {
    CmsGalleryItem,
    CmsPage,
    CmsPageSeo,
    CmsPost,
    CmsSiteConfig,
    SitemapTypeBucket,
    ThemeOptions,
    MediaImage,
    SitePage,
    PostFull,
    PostListItem,
} from "./types";

// All website content lives in Firestore and is edited in the /admin panel:
//   config/site        contact details, phones, socials, logos, GTM, robots.txt, llms.txt
//   posts/{slug}       blog posts
//   gallery/{id}       gallery photos
//   pages/{uri}        privacy-policy, terms-service
//   seo/{pageId}       search & share tags per page (see lib/cms/sitePages.ts)
//
// Reads are cached for 10 minutes and tagged; the admin panel clears the tags
// on every save (see lib/cms/revalidate.ts) so edits show up immediately.

export const CMS_TAGS = {
    site: "cms-site",
    posts: "cms-posts",
    gallery: "cms-gallery",
    pages: "cms-pages",
    seo: "cms-seo",
} as const;

const REVALIDATE = 600;

function cached<A extends unknown[], R>(
    fn: (...args: A) => Promise<R>,
    key: string,
    tag: string,
    fallback: R,
) {
    // Only successful reads are cached: errors/missing config return the
    // fallback without storing it, so a temporary outage never sticks.
    const cachedFn = unstable_cache(fn, [key], { tags: [tag], revalidate: REVALIDATE });
    return async (...args: A): Promise<R> => {
        if (!isFirebaseConfigured()) return fallback;
        try {
            return await cachedFn(...args);
        } catch (err) {
            console.error(`[cms] ${key} failed:`, err);
            return fallback;
        }
    };
}

// ------------------------------------------------------------------ helpers
export function seoDocId(uri: string): string {
    const clean = uri.replace(/^\/+|\/+$/g, "") || "home";
    return clean.replace(/\//g, "__");
}

function toListItem(p: CmsPost): PostListItem {
    return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        featuredImage: p.featuredImage
            ? { node: { altText: p.featuredImage.alt, mediaItemUrl: p.featuredImage.url } }
            : null,
        author: { node: { name: p.author || "DeePet" } },
        categories: { nodes: p.categories ?? [] },
    };
}

export type PublicPost = PostFull & {
    slug: string;
    excerpt: string;
    modified: string;
    seo: { title: string; description: string };
};

function toFull(p: CmsPost): PublicPost {
    return {
        ...toListItem(p),
        content: p.content,
        modified: p.modified || p.date,
        tags: { nodes: p.tags ?? [] },
        seo: p.seo ?? { title: "", description: "" },
    };
}

// ------------------------------------------------------------------ site config
export const getSiteConfig = cached(
    async (): Promise<CmsSiteConfig | null> => {
        const snap = await db().collection("config").doc("site").get();
        return (snap.data() as CmsSiteConfig | undefined) ?? null;
    },
    "site-config",
    CMS_TAGS.site,
    null,
);

export async function getThemeOptions(): Promise<ThemeOptions | null> {
    const cfg = await getSiteConfig();
    if (!cfg) return null;
    return {
        analytics: { gtmId: cfg.analytics?.gtmId ?? "" },
        company: {
            favicon: cfg.company?.favicon ?? "",
            logoVar1: cfg.company?.logoVar1 ?? "",
            logoVar2: cfg.company?.logoVar2 ?? "",
            logoVar3: cfg.company?.logoVar3 ?? "",
            logoVar4: cfg.company?.logoVar4 ?? "",
            siteTitle: cfg.company?.siteTitle ?? "DeePet Services",
        },
        contact: {
            address: cfg.contact?.address ?? "",
            email: cfg.contact?.email ?? "",
            latitude: cfg.contact?.latitude ?? "",
            longitude: cfg.contact?.longitude ?? "",
            phones: cfg.contact?.phones ?? [],
        },
        socialMedia: cfg.socialMedia ?? [],
    };
}

export async function getRobotsTxt(): Promise<string | null> {
    return (await getSiteConfig())?.robotsTxt || null;
}

export async function getLlmsTxt(): Promise<string | null> {
    return (await getSiteConfig())?.llmsTxt || null;
}

// ------------------------------------------------------------------ blog
const getPublishedPosts = cached(
    async (): Promise<CmsPost[]> => {
        const snap = await db()
            .collection("posts")
            .where("status", "==", "published")
            .get();
        return snap.docs
            .map((d) => d.data() as CmsPost)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    "posts-published",
    CMS_TAGS.posts,
    [],
);

export async function getAllPosts(): Promise<PostListItem[]> {
    return (await getPublishedPosts()).map(toListItem);
}

export async function getPosts(first = 12): Promise<PostListItem[]> {
    return (await getAllPosts()).slice(0, first);
}

export async function getPostSlugs(): Promise<string[]> {
    return (await getPublishedPosts()).map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<PublicPost | null> {
    const post = (await getPublishedPosts()).find((p) => p.slug === slug);
    return post ? toFull(post) : null;
}

// ------------------------------------------------------------------ gallery
export const getGalleryItems = cached(
    async (): Promise<CmsGalleryItem[]> => {
        const snap = await db().collection("gallery").orderBy("order", "asc").get();
        return snap.docs.map((d) => ({ ...(d.data() as CmsGalleryItem), id: d.id }));
    },
    "gallery",
    CMS_TAGS.gallery,
    [],
);

export async function getGalleryImages(): Promise<MediaImage[]> {
    return (await getGalleryItems()).map((g) => ({ altText: g.alt, mediaItemUrl: g.url }));
}

// ------------------------------------------------------------------ pages
export const getPageByUri = cached(
    async (uri: string): Promise<SitePage | null> => {
        const snap = await db().collection("pages").doc(seoDocId(uri)).get();
        const page = snap.data() as CmsPage | undefined;
        return page ? { title: page.title, content: page.content } : null;
    },
    "page-by-uri",
    CMS_TAGS.pages,
    null,
);

// ------------------------------------------------------------------ SEO
export const getAllPageSeo = cached(
    async (): Promise<CmsPageSeo[]> => {
        const snap = await db().collection("seo").get();
        return snap.docs.map((d) => ({ ...(d.data() as CmsPageSeo), id: d.id }));
    },
    "page-seo-all",
    CMS_TAGS.seo,
    [],
);

export async function getPageSeo(id: string): Promise<CmsPageSeo | null> {
    return (await getAllPageSeo()).find((s) => s.id === seoDocId(id)) ?? null;
}

// ------------------------------------------------------------------ sitemap
/**
 * Sitemap buckets, generated from the site's own data:
 *   post — every published blog post
 *   page — every page in lib/cms/sitePages.ts not marked "hide from Google"
 */
export async function getAllSitemapBuckets(): Promise<SitemapTypeBucket[]> {
    const [posts, seo] = await Promise.all([getPublishedPosts(), getAllPageSeo()]);
    const postUrls = posts.map((p) => ({
        url: siteUrl(`/blog/${p.slug}`),
        lastModified: p.modified || p.date,
    }));
    const seoById = new Map(seo.map((s) => [s.id, s]));
    const pageUrls = SITE_PAGES.filter((p) => !seoById.get(p.id)?.noindex).map((p) => ({
        url: p.path === "/" ? SITE_URL : siteUrl(p.path),
        lastModified: seoById.get(p.id)?.updatedAt ?? null,
    }));
    return [
        { type: "post", lastModified: postUrls[0]?.lastModified ?? null, urls: postUrls },
        { type: "page", lastModified: null, urls: pageUrls },
    ];
}
