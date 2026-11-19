import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { getLocalPostBySlug, getLocalPostSlugs } from "@/lib/blog";
import { SeoHead } from "@/components/seo/SeoHead";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
    return getLocalPostSlugs().map((slug) => ({ slug }));
}

function formatDate(dateString: string): string {
    try {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    } catch {
        return dateString;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getLocalPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    // SeoHead below still pulls SEO from WordPress; these stored values are
    // the fallback when WordPress can't be reached.
    if (post.seo?.title || post.seo?.description) {
        return {
            title: post.seo?.title || post.title,
            description: post.seo?.description || undefined,
        };
    }

    // SEO (title/description/OG/canonical) is supplied by the TeqzWP SEO plugin
    // via <SeoHead> rendered in the page body.
    return {};
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const post = getLocalPostBySlug(slug);

    if (!post) notFound();

    const image = post.featuredImage?.node;
    const categories = post.categories?.nodes ?? [];
    const tags = post.tags?.nodes ?? [];
    const authorName = post.author?.node?.name;

    return (
        <main className="min-h-screen">
            <SeoHead uri={`blog/${slug}`} />
            <Navbar />

            <article className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-[#3893c5] hover:text-[#003451] font-medium mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((cat) => (
                                <span
                                    key={cat.slug ?? cat.name}
                                    className="bg-[#bfe37f] text-[#133d39] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#003451] mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-100">
                        {authorName && (
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#3893c5]" /> {authorName}
                            </span>
                        )}
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#3893c5]" /> {formatDate(post.date)}
                        </span>
                    </div>

                    {image && (
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 bg-gray-100">
                            <Image
                                src={image.mediaItemUrl}
                                alt={image.altText || post.title}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div
                        className="wp-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-3">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {tags.map((tag) => (
                                <span
                                    key={tag.slug ?? tag.name}
                                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>

            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
