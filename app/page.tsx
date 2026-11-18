import { Hero } from "@/components/home/Hero";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { WhyHomeVisit } from "@/components/home/WhyHomeVisit";
import { OfferBlock } from "@/components/home/OfferBlock";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BookingSection } from "@/components/home/BookingSection";
import { FAQ } from "@/components/home/FAQ";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ClientWall } from "@/components/home/ClientWall";
import { PetCareIntro } from "@/components/home/PetCareIntro";
import { SeoHead } from "@/components/seo/SeoHead";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <SeoHead uri="home" />
      <Navbar />
      <Hero />
      <ClientWall />
      <DoctorsSection />
      <HowItWorks />
      <Services />
      <WhyChoose />
      <WhyHomeVisit />
      <PetCareIntro />
      <OfferBlock />
      <Testimonials />
      <BookingSection />
      <FAQ />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
