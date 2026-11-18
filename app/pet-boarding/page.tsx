import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { BoardingHero } from "@/components/pet-boarding/BoardingHero";
import { BoardingInfo } from "@/components/pet-boarding/BoardingInfo";
import { BoardingIntro } from "@/components/pet-boarding/BoardingIntro";
import { BoardingPricing } from "@/components/pet-boarding/BoardingPricing";
import { BoardingDetails } from "@/components/pet-boarding/BoardingDetails";
import { BoardingCrossPromos } from "@/components/pet-boarding/BoardingCrossPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function PetBoardingPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="pet-boarding" fallback={{ title: "Premium Pet Boarding & Hostel Services | DeePet Services", description: "Book trusted pet boarding services starting from ₹999. Comfortable stay, 24/7 daycare, and medical facilities for your dogs and cats in Delhi, Gurgaon, and Noida." }} />
            <Navbar />
            <BoardingHero />
            <BoardingInfo />
            <BoardingIntro />
            <BoardingPricing />
            <BoardingDetails />
            <BoardingCrossPromos />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
