export type ThemePhone = {
    name: string;
    phone: string;
};

export type ThemeSocial = {
    iconClass: string;
    platformName: string;
    url: string;
};

export type ThemeOptions = {
    analytics: {
        gtmId: string;
    };
    company: {
        favicon: string;
        logoVar1: string;
        logoVar2: string;
        logoVar3: string;
        logoVar4: string;
        siteTitle: string;
    };
    contact: {
        address: string;
        email: string;
        latitude: string;
        longitude: string;
        phones: ThemePhone[];
    };
    socialMedia: ThemeSocial[];
};

export type MediaImage = {
    altText: string;
    mediaItemUrl: string;
};

export type Term = {
    name: string;
    slug?: string;
};

export type PostListItem = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    featuredImage: { node: MediaImage | null } | null;
    author: { node: { name: string } | null } | null;
    categories: { nodes: Term[] } | null;
};

export type PostFull = {
    title: string;
    content: string;
    date: string;
    featuredImage: { node: MediaImage | null } | null;
    author: { node: { name: string } | null } | null;
    categories: { nodes: Term[] } | null;
    tags: { nodes: Term[] } | null;
};

export type SitePage = {
    title: string;
    content: string;
};

export type SeoSitemapUrl = {
    lastModified: string | null;
    url: string;
};

// One child sitemap, served at /sitemap/<type>.xml (e.g. post, page).
export type SitemapTypeBucket = {
    type: string;
    lastModified: string | null;
    urls: SeoSitemapUrl[] | null;
};

// ---------------------------------------------------------------------------
// Firestore documents — all edited from the /admin panel
// ---------------------------------------------------------------------------

export type CmsImage = {
    url: string;
    alt: string;
    /** Firebase Storage object path, when the image was uploaded there. */
    path?: string;
};

/** posts/{slug} */
export type CmsPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string; // ISO
    modified?: string;
    status: "published" | "draft";
    featuredImage: CmsImage | null;
    author: string;
    categories: Term[];
    tags: Term[];
    seo: { title: string; description: string };
};

/** gallery/{id} */
export type CmsGalleryItem = CmsImage & { id: string; order: number };

/** pages/{uri} — e.g. privacy-policy, terms-service */
export type CmsPage = { uri: string; title: string; content: string };

/** config/site — website-wide settings (Admin → Website Info) */
export type CmsSiteConfig = ThemeOptions & {
    robotsTxt?: string;
    llmsTxt?: string;
};

/** seo/{id} — search/share tags for one page (Admin → SEO). */
export type CmsPageSeo = {
    id: string;
    /** Public path, e.g. "/" or "/pet-boarding". */
    path: string;
    label: string;
    title: string;
    description: string;
    /** Share image for WhatsApp/Facebook/Twitter (optional). */
    ogImage: string;
    /** Hide from Google + leave out of the sitemap. */
    noindex: boolean;
    /** Structured data (JSON-LD), e.g. business info and FAQs. */
    schemaJson: string;
    updatedAt?: string;
};
