import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { LocationHero } from "@/components/locations/LocationHero";
import { LocationIntro } from "@/components/locations/LocationIntro";
import { LocationOfferings } from "@/components/locations/LocationOfferings";
import { LocationPromos } from "@/components/locations/LocationPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { CheckCircle } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";

export default function GhaziabadPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="deepet-services-ghaziabad" fallback={{ title: "Trusted Pet Care Services in Ghaziabad | Dog & Cat Sitting", description: "Affordable pet care in Ghaziabad. Doorstep vaccinations, boarding, and vet visits in Indirapuram, Vaishali, Raj Nagar. Certified pet experts at home." }} />
            <Navbar />
            <LocationHero
                city="Ghaziabad"
                title="DoorStep Pet Services in Ghaziabad"
                services={[
                    "Veterinary Services in Ghaziabad",
                    "Pet Vaccination Services in Ghaziabad",
                    "Pet Boarding Services in Ghaziabad",
                    "Online Vet Consultation in Ghaziabad"
                ]}
            />
            <LocationIntro
                city="Ghaziabad"
                paragraphs={[
                    "At DeePetServices, we know your pets are not only an animal – they are family 🐾. That’s why we provide trusted, affordable, and professional pet care services in Ghaziabad designed to keep your furry friends happy, healthy, and safe.",
                    "Whether you need reliable pet boarding in Indirapuram, at-home vaccinations in Vaishali, or an emergency vet home visit in Raj Nagar, DeePet is your one-stop solution for complete dog and cat care in Ghaziabad.",
                    "Join 1000+ pet parents in Ghaziabad who trust DeePet's specialized care including Indirapuram, Vasundhara, Vaishali, Crossings Republik and across the city."
                ]}
                highlightText="DeePet has been taking care of our Golden Retriever in Kaushambi. The vet visit and boarding services are excellent & affordable."
                testimonial={{
                    text: " Rohit Sarkar, Ghaziabad",
                    author: "Happy Pet Parent"
                }}
            />
            <LocationPromos
                city="Ghaziabad"
                promos={[
                    {
                        title: "Vaccination",
                        newText: "Expert at-home vaccination services",
                        oldText: "",
                        discount: "12% OFF",
                        icon: "syringe",
                        color: "bg-[#003451]"
                    },
                    {
                        title: "Nutrition",
                        newText: "Proper nutrition plan for your pet's life",
                        oldText: "",
                        discount: "15% OFF",
                        icon: "apple",
                        color: "bg-[#3893c5]"
                    },
                    {
                        title: "Diagnostics",
                        newText: "Keep your pet in tip-top shape with checkups",
                        oldText: "",
                        discount: "12% OFF",
                        icon: "activity",
                        color: "bg-[#bfe37f]/90"
                    }
                ]}
            />
            <LocationOfferings
                city="Ghaziabad"
                services={[
                    { name: "Pet Vaccination", desc: "Serving Indirapuram, Vaishali & Crossings Republik.", icon: "syringe", href: "/pet-vaccinations" },
                    { name: "Pet Sitting", desc: "Safe, loved care while you're away from home.", icon: "home", href: "/pet-boarding" },
                    { name: "Vet Home Visit", desc: "Dr. Deepak & Dr. Diksha serving all local areas.", icon: "stethoscope", href: "/#services" },
                    { name: "Cat Care", desc: "Independence-respecting care and attention.", icon: "heart", href: "/#services" }
                ]}
            />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="bg-[#003451] rounded-[4rem] p-12 text-white relative overflow-hidden">
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-3xl font-serif font-bold italic text-[#bfe37f]">Special Coverage Areas:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {["Indirapuram", "Vaishali", "Raj Nagar", "Kaushambi", "Crossings Republik", "Kavi Nagar"].map((area, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-[#bfe37f]" />
                                            <span className="font-bold text-sm">{area}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 text-center">
                            <h3 className="text-4xl font-serif font-bold text-[#003451]">Why Professional Care Matters?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4 p-8 bg-[#f8fafc] rounded-[3rem] border border-gray-100">
                                    <div className="w-12 h-12 bg-[#bfe37f] rounded-2xl mx-auto flex items-center justify-center text-[#003451]">1</div>
                                    <h4 className="font-bold text-[#003451]">Peace of Mind</h4>
                                    <p className="text-gray-500 text-sm">Less stress when you&apos;re away from home.</p>
                                </div>
                                <div className="space-y-4 p-8 bg-[#f8fafc] rounded-[3rem] border border-gray-100">
                                    <div className="w-12 h-12 bg-[#bfe37f] rounded-2xl mx-auto flex items-center justify-center text-[#003451]">2</div>
                                    <h4 className="font-bold text-[#003451]">Better Health</h4>
                                    <p className="text-gray-500 text-sm">Regular exercise, grooming, and vet visits.</p>
                                </div>
                                <div className="space-y-4 p-8 bg-[#f8fafc] rounded-[3rem] border border-gray-100">
                                    <div className="w-12 h-12 bg-[#bfe37f] rounded-2xl mx-auto flex items-center justify-center text-[#003451]">3</div>
                                    <h4 className="font-bold text-[#003451]">Behavioral Benefits</h4>
                                    <p className="text-gray-500 text-sm">Socialization and training minimize problems.</p>
                                </div>
                            </div>
                        </div>

                        <BookingSection />
                    </div>
                </div>
            </section>

            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
