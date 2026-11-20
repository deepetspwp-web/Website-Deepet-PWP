import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { PageContent } from "@/components/cms/PageContent";
import { getPageByUri } from "@/lib/cms";
import { SeoHead } from "@/components/seo/SeoHead";

export default async function PrivacyPolicyPage() {
    const page = await getPageByUri("privacy-policy");
    if (!page) notFound();

    return (
        <main className="min-h-screen">
            <SeoHead uri="privacy-policy" fallback={{ title: "Privacy Policy" }} />
            <Navbar />
            <div className="pt-12">
                <PageContent page={page} />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
