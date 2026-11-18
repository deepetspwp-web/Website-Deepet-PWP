import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { GroomingHero } from "@/components/pet-grooming/GroomingHero";
import { GroomingIntro } from "@/components/pet-grooming/GroomingIntro";
import { GroomingOfferings } from "@/components/pet-grooming/GroomingOfferings";
import { GroomingPricing } from "@/components/pet-grooming/GroomingPricing";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function PetGroomingPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="pet-grooming" fallback={{ title: "At-Home Pet Grooming Services | Doorstep Dog & Cat Grooming", description: "Professional at-home pet grooming services starting from ₹999. Expert groomers for dogs and cats. Book now for a stress-free grooming experience at your doorstep." }} />
            <Navbar />
            <GroomingHero />
            <GroomingIntro />
            <GroomingOfferings />
            <GroomingPricing />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
