import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { BookingSection } from "@/components/home/BookingSection";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingCatalog } from "@/components/pricing/PricingCatalog";
import { PricingPromos } from "@/components/pricing/PricingPromos";
import { SeoHead } from "@/components/seo/SeoHead";

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="pricing" fallback={{ title: "Pricing | Affordable Pet Care Services in Delhi NCR | DeePet", description: "Cheap and best pet grooming, veterinary, training, and boarding pricing in Delhi NCR. Transparent rates for all dog and cat care services starting from ₹199." }} />
            <Navbar />
            <PricingHero />
            <PricingCatalog />
            <PricingPromos />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
