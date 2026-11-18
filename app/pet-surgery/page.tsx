import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { SurgeryHero } from "@/components/pet-surgery/SurgeryHero";
import { SurgeryIntro } from "@/components/pet-surgery/SurgeryIntro";
import { SurgeryOfferings } from "@/components/pet-surgery/SurgeryOfferings";
import { SurgeryDetails } from "@/components/pet-surgery/SurgeryDetails";
import { SurgeryCrossPromos } from "@/components/pet-surgery/SurgeryCrossPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function PetSurgeryPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="pet-surgery" fallback={{ title: "#1 Pet Surgery Hospital Delhi NCR | Expert Vet Surgeons", description: "Experienced vet surgeons for dog & cat surgeries in Delhi NCR. Specializing in spaying, neutering, orthopedic, and soft tissue surgeries starting from ₹5,000." }} />
            <Navbar />
            <SurgeryHero />
            <SurgeryIntro />
            <SurgeryOfferings />
            <SurgeryDetails />
            <SurgeryCrossPromos />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
