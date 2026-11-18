import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionVisionValues } from "@/components/about/MissionVisionValues";
import { PetCareDetails } from "@/components/about/PetCareDetails";
import { OurExperience } from "@/components/about/OurExperience";
import { AboutSteps } from "@/components/about/AboutSteps";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <SeoHead
                uri="about"
                fallback={{
                    title: "About Us | DeePet Services",
                    description: "Learn about DeePet Services, our mission, vision, and the expert care we provide for dogs and cats.",
                }}
            />
            <Navbar />
            <AboutHero />
            <MissionVisionValues />
            <PetCareDetails />
            <OurExperience />
            <AboutSteps />
            <div className="bg-white">
                <BookingSection />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
