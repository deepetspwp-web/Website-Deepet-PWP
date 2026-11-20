import type { SitePage } from "@/lib/cms/types";

export function PageContent({ page }: { page: SitePage }) {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#003451] mb-8 text-center">
                        {page.title}
                    </h1>
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </div>
        </section>
    );
}
