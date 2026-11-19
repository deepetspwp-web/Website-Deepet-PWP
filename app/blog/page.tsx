import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { PostCard } from "@/components/blog/PostCard";
import { getLocalPosts } from "@/lib/blog";
import { SeoHead } from "@/components/seo/SeoHead";

export default async function BlogPage() {
    const posts = getLocalPosts();

    return (
        <main className="min-h-screen">
            <SeoHead uri="blog" fallback={{ title: "Blog - Pet Care Insights & Tips", description: "Read the latest articles on pet care, health, training, and lifestyle from the DeePet Services team." }} />
            <Navbar />
            <section className="bg-[#003451] text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3893c5]/10 rounded-l-[10rem] transform translate-x-1/4 -skew-x-12" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Our <span className="text-[#bfe37f]">Blog</span>
                    </h1>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Practical pet care advice, expert vet insights, and stories from the DeePet team.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-[#f8fafc]">
                <div className="container mx-auto px-4 md:px-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <PostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
