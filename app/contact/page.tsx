import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { SeoHead } from "@/components/seo/SeoHead";

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="contact" fallback={{ title: "Contact Us | DeePet Services - Best Doorstep Pet Care", description: "Get in touch with DeePet Services for professional at-home pet care. Book appointments for dog walking, grooming, training, and veterinary home visits. We are available 24/7 in Delhi NCR." }} />
            <Navbar />
            <ContactHero />
            <ContactDetails />
            <ContactForm />
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
