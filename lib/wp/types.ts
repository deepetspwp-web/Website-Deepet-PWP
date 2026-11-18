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

export type WPMedia = {
    altText: string;
    mediaItemUrl: string;
};

export type WPTerm = {
    name: string;
    slug?: string;
};

export type WPPostListItem = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    featuredImage: { node: WPMedia | null } | null;
    author: { node: { name: string } | null } | null;
    categories: { nodes: WPTerm[] } | null;
};

export type WPPostFull = {
    title: string;
    content: string;
    date: string;
    featuredImage: { node: WPMedia | null } | null;
    author: { node: { name: string } | null } | null;
    categories: { nodes: WPTerm[] } | null;
    tags: { nodes: WPTerm[] } | null;
};

export type WPGallery = {
    galleryDetails: {
        galleryImages: { nodes: WPMedia[] } | null;
    } | null;
};

export type WPPage = {
    title: string;
    content: string;
};

export type SeoSitemapUrl = {
    lastModified: string | null;
    url: string;
};

export type SeoSitemapEntry = {
    lastModified: string | null;
    postType: string;
    urls: SeoSitemapUrl[];
};

export type SeoSitemapTaxonomyEntry = {
    lastModified: string | null;
    taxonomyType: string;
    urls: SeoSitemapUrl[];
};

// Unified bucket keyed by a single `type` string. Post types and taxonomies
// share the /sitemap/<type>.xml child-sitemap scheme.
export type SitemapTypeBucket = {
    type: string;
    lastModified: string | null;
    urls: SeoSitemapUrl[] | null;
};
