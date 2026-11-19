import rawPosts from "@/content/blog/posts.json";
import type { WPPostFull, WPPostListItem } from "@/lib/wp/types";

// Blog posts exported from WordPress (api.deepetservices.com), stored in the
// repo so the blog no longer depends on WordPress being reachable.
// Images live in public/blog-images/<year>/<month>/<file>.

type StoredPost = WPPostFull & {
    slug: string;
    excerpt: string;
    seo?: { title?: string | null; description?: string | null } | null;
};

const UPLOADS_PREFIX = /https?:\/\/api\.deepetservices\.com\/wp-content\/uploads\//g;

function localiseUrls<T>(value: T): T {
    return JSON.parse(
        JSON.stringify(value).replace(UPLOADS_PREFIX, "/blog-images/"),
    ) as T;
}

const posts: StoredPost[] = localiseUrls(rawPosts as unknown as StoredPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getLocalPosts(): WPPostListItem[] {
    return posts.map(({ slug, title, excerpt, date, featuredImage, author, categories }) => ({
        slug,
        title,
        excerpt,
        date,
        featuredImage,
        author,
        categories,
    }));
}

export function getLocalPostBySlug(slug: string): StoredPost | null {
    return posts.find((post) => post.slug === slug) ?? null;
}

export function getLocalPostSlugs(): string[] {
    return posts.map((post) => post.slug);
}
