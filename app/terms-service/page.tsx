import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { WPPageContent } from "@/components/wp/WPPageContent";
import { getPageByUri } from "@/lib/wp";
import { SeoHead } from "@/components/seo/SeoHead";

export default async function TermsOfServicePage() {
    const page = await getPageByUri("terms-service");
    if (!page) notFound();

    return (
        <main className="min-h-screen">
            <SeoHead uri="terms-service" fallback={{ title: "Terms of Service" }} />
            <Navbar />
            <div className="pt-12">
                <WPPageContent page={page} />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
