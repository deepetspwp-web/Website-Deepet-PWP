import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { DogWalkingHero } from "@/components/dog-walking/DogWalkingHero";
import { DogWalkingInfo } from "@/components/dog-walking/DogWalkingInfo";
import { DogWalkingIntro } from "@/components/dog-walking/DogWalkingIntro";
import { DogWalkingSteps } from "@/components/dog-walking/DogWalkingSteps";
import { DogWalkingWhy } from "@/components/dog-walking/DogWalkingWhy";
import { DogWalkingPricing } from "@/components/dog-walking/DogWalkingPricing";
import { DogWalkingGrooming } from "@/components/dog-walking/DogWalkingGrooming";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function DogWalkingPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="dog-walking" fallback={{ title: "Dog Walking Services Gurgaon & Delhi | DeePet Services", description: "Expert dog walking services in Gurgaon and Delhi. Professional dog walkers for your pup's health and happiness." }} />
            <Navbar />
            <DogWalkingHero />
            <DogWalkingInfo />
            <DogWalkingIntro />
            <DogWalkingSteps />
            <DogWalkingWhy />
            <DogWalkingPricing />
            <DogWalkingGrooming />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
