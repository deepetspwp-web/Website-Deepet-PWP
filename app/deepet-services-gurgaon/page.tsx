import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { LocationHero } from "@/components/locations/LocationHero";
import { LocationIntro } from "@/components/locations/LocationIntro";
import { LocationOfferings } from "@/components/locations/LocationOfferings";
import { LocationPromos } from "@/components/locations/LocationPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { findPhone, getThemeOptions } from "@/lib/wp";
import { SeoHead } from "@/components/seo/SeoHead";

export default async function GurgaonPage() {
    const theme = await getThemeOptions();
    const phones = theme?.contact.phones ?? [];
    const supportPhone = findPhone(phones, "Phone") ?? phones[0];
    return (
        <main className="min-h-screen">
            <SeoHead uri="deepet-services-gurgaon" fallback={{ title: "At Home Pet Care Services Gurgaon | Expert Pet Daycare & Walking", description: "Trusted pet care and boarding in Gurgaon. Professional vet visits, vaccinations, and online consultations. Serving Gurgaon with 10+ years of excellence." }} />
            <Navbar />
            <LocationHero
                city="Gurgaon"
                title="At Home Pet Care Services in Gurgaon"
                services={[
                    "Veterinary Services in Gurgaon",
                    "Pet Vaccination Services in Gurgaon",
                    "Pet Boarding Services in Gurgaon",
                    "Pet Surgery Services in Gurgaon",
                    "Online Vet Consultation in Gurgaon"
                ]}
            />
            <LocationIntro
                city="Gurgaon"
                paragraphs={[
                    "You might be hesitant to leave your pet at some neighbour place when you are going out or busy in your work. At DeePet pet care Gurgaon we understand your love to your pet. This is why we offer an unending list of pet care facilities designed to make your pet feel happy and safe.",
                    "Serving in this industry for more than 10 years, we have gained thousands of happy pets in our client list. If you are looking for a helping hand to look after your pet then DeePet is here to assist you with state-of-the-art facilities and a trained team.",
                    "As neighbors might not be familiar with specific diets or needs, your canine companion is in professional hands with us. We offer customized plans for boarding, daycare, vaccinations, and vet visits to ensure the best for your pet."
                ]}
                highlightText="State-of-the-art facilities and affordable pricing for premium pet care in Gurgaon."
                testimonial={{
                    text: "We take pride in delivering the best dog care caretaker services at home including daycare and socialization.",
                    author: "Gurgaon Care Team"
                }}
            />
            <LocationPromos
                city="Gurgaon"
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
                city="Gurgaon"
                services={[
                    { name: "Pet Boarding", desc: "Long and short stays with personalized attention.", icon: "home", href: "/pet-boarding" },
                    { name: "Pet Daycare", desc: "Socialize and play in a safe, fun environment.", icon: "heart", href: "/#services" },
                    { name: "Pet Vaccination", desc: "Doorstep immunization for dogs & cats.", icon: "syringe", href: "/pet-vaccinations" },
                    { name: "Online Vet", desc: "Emergency expert help via video call 24/7.", icon: "monitor", href: "/online-vet-consultation" }
                ]}
            />
            <div className="bg-[#f8fafc] py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-8">
                        <h3 className="text-3xl font-serif font-bold text-[#003451] text-center">How to Book in Gurgaon?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                            <div className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#bfe37f] flex items-center justify-center shrink-0 font-black">1</span>
                                <p className="text-gray-500">Visit our homepage and fill the contact form with breed, age, and health details.</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#bfe37f] flex items-center justify-center shrink-0 font-black">2</span>
                                <p className="text-gray-500">Choose the service required (Cat or Dog care Gurgaon).</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#bfe37f] flex items-center justify-center shrink-0 font-black">3</span>
                                <p className="text-gray-500">Connect with support instantly at <span className="font-bold text-[#3893c5]">{supportPhone?.phone}</span> for details.</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-8 h-8 rounded-full bg-[#bfe37f] flex items-center justify-center shrink-0 font-black">4</span>
                                <p className="text-gray-500">Complete the payment to book your slot immediately.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <BookingSection />
                    </div>
                </div>
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
