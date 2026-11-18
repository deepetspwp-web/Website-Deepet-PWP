import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ConsultationHero } from "@/components/online-consultation/ConsultationHero";
import { ConsultationDoctors } from "@/components/online-consultation/ConsultationDoctors";
import { ConsultationBenefits } from "@/components/online-consultation/ConsultationBenefits";
import { ConsultationContent } from "@/components/online-consultation/ConsultationContent";
import { ConsultationTable } from "@/components/online-consultation/ConsultationTable";
import { ConsultationFAQ } from "@/components/online-consultation/ConsultationFAQ";
import { SeoHead } from "@/components/seo/SeoHead";

export default function OnlineConsultationPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="online-vet-consultation" fallback={{ title: "24/7 Online Vet Consultation | Talk to Expert Vet @ ₹199", description: "Get trusted pet care advice from certified veterinarians online. Instant video call or chat for dog & cat health issues. Starting at just ₹199." }} />
            <Navbar />
            <ConsultationHero />
            <ConsultationDoctors />
            <ConsultationBenefits />
            <ConsultationContent />
            <ConsultationTable />
            <ConsultationFAQ />
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
