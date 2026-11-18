import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { VaccinationHero } from "@/components/pet-vaccinations/VaccinationHero";
import { VaccinationIntro } from "@/components/pet-vaccinations/VaccinationIntro";
import { VaccinationPricing } from "@/components/pet-vaccinations/VaccinationPricing";
import { VaccinationOfferings } from "@/components/pet-vaccinations/VaccinationOfferings";
import { VaccinationDetails } from "@/components/pet-vaccinations/VaccinationDetails";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function PetVaccinationsPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="pet-vaccinations" fallback={{ title: "#1 Doorstep Pet Vaccination Delhi NCR | Vet Visit At Home", description: "Expert at-home pet vaccinations for dogs & cats. Puppy & adult packages starting from ₹1,799. Certified vet surgeons, 24/7 support across Delhi, Noida, Gurgaon." }} />
            <Navbar />
            <VaccinationHero />
            <VaccinationIntro />
            <VaccinationPricing />
            <VaccinationOfferings />
            <VaccinationDetails />
            <div className="bg-[#f8fafc]">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
