import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { TrainingHero } from "@/components/pet-training/TrainingHero";
import { TrainingIntro } from "@/components/pet-training/TrainingIntro";
import { TrainingOfferings } from "@/components/pet-training/TrainingOfferings";
import { TrainingWhy } from "@/components/pet-training/TrainingWhy";
import { TrainingPricing } from "@/components/pet-training/TrainingPricing";
import { TrainingCrossPromos } from "@/components/pet-training/TrainingCrossPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function PetTrainingPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="pet-training" fallback={{ title: "Expert At-Home Dog Training Services | Behavior & Obedience", description: "Professional dog training services at your doorstep starting from ₹9,999. Behavior, social, obedience, and potty training by experienced specialists." }} />
            <Navbar />
            <TrainingHero />
            <TrainingIntro />
            <TrainingOfferings />
            <TrainingWhy />
            <TrainingPricing />
            <TrainingCrossPromos />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
