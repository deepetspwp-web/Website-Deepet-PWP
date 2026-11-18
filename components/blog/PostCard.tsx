import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { WPPostListItem } from "@/lib/wp/types";

function formatDate(dateString: string): string {
    try {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return dateString;
    }
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

export function PostCard({ post }: { post: WPPostListItem }) {
    const image = post.featuredImage?.node;
    const category = post.categories?.nodes?.[0];
    const authorName = post.author?.node?.name;
    const excerpt = post.excerpt ? stripHtml(post.excerpt) : "";

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#bfe37f]/30 transition-all"
        >
            <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                {image ? (
                    <Image
                        src={image.mediaItemUrl}
                        alt={image.altText || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003451] to-[#3893c5]" />
                )}
                {category && (
                    <span className="absolute top-4 left-4 bg-[#bfe37f] text-[#133d39] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {category.name}
                    </span>
                )}
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-bold text-[#003451] mb-3 line-clamp-2 group-hover:text-[#3893c5] transition-colors">
                    {post.title}
                </h3>
                {excerpt && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                        {excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        {authorName && (
                            <span className="flex items-center gap-1">
                                <User className="w-3 h-3" /> {authorName}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                        </span>
                    </div>
                    <span className="flex items-center gap-1 font-bold text-[#3893c5] group-hover:translate-x-1 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
