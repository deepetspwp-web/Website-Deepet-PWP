import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { VetHero } from "@/components/veterinary-doctor/VetHero";
import { VetIntro } from "@/components/veterinary-doctor/VetIntro";
import { VetPricing } from "@/components/veterinary-doctor/VetPricing";
import { VetDetailedInfo } from "@/components/veterinary-doctor/VetDetailedInfo";
import { VetAdditionalServices } from "@/components/veterinary-doctor/VetAdditionalServices";
import { VetFAQ } from "@/components/veterinary-doctor/VetFAQ";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function VeterinaryDoctorPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="veterinary-doctor" fallback={{ title: "At-Home Veterinary Doctor Services | Professional Pet Healthcare at Doorstep", description: "Book expert veterinary doctor home visits for dogs and cats starting from ₹499. Services include routine check-ups, vaccinations, blood tests, and specialized pet healthcare in the comfort of your home." }} />
            <Navbar />
            <VetHero />
            <VetIntro />
            <VetPricing />
            <VetDetailedInfo />
            <VetAdditionalServices />
            <VetFAQ />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
