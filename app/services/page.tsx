import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesDetails } from "@/components/services/ServicesDetails";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="services" fallback={{ title: "All Pet Care Services in Delhi NCR | DeePet Services", description: "Explore our wide range of professional pet care services including grooming, veterinary care, dog training, surgery, and boarding across Delhi NCR." }} />
            <Navbar />
            <ServicesHero />
            <ServicesGrid />
            <ServicesDetails />
            <div className="bg-[#f8fafc]">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
