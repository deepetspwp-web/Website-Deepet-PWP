import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { LocationHero } from "@/components/locations/LocationHero";
import { LocationIntro } from "@/components/locations/LocationIntro";
import { LocationOfferings } from "@/components/locations/LocationOfferings";
import { LocationPromos } from "@/components/locations/LocationPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function NoidaPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="deepet-services-noida" fallback={{ title: "Doorstep Pet Services in Noida | Expert Dog & Cat Care", description: "Premium pet care in Noida including hostel facilities, vaccinations, and veterinary home visits. Dedicated care for your furry members. Easy online booking." }} />
            <Navbar />
            <LocationHero
                city="Noida"
                title="DoorStep Pet Services in Noida"
                services={[
                    "Dog & Cat Vaccination in Noida",
                    "Veterinary Services in Noida",
                    "Pet Boarding Services in Noida",
                    "Pet Surgery Services in Noida",
                    "Online Vet Consultation in Noida"
                ]}
            />
            <LocationIntro
                city="Noida"
                paragraphs={[
                    "In this fast paced world do you also feel that you don't have dedicated time to give to your pet? You are not alone. There are many pet parents who are constantly stressed about the health of their furry family members.",
                    "Proper pet care in Noida can help alleviate these concerns. At DeePet, we understand the love you have for your pets; they are beloved members of your family. This is why we provide comprehensive services that ensure the overall well-being of your companions.",
                    "Whether you're looking for at-home vaccinations, a comfortable hostel, or expert veterinary care at home, DeePet is your ultimate destination for high-quality pet care in Noida."
                ]}
                highlightText="We thrive to provide exceptional care as per your pet's needs and preferences. Every pet is unique and deserves personalized attention."
                testimonial={{
                    text: "The mental and physical health of your pet is top priority. Our mental stimulation routines are designed for Noida's lifestyle.",
                    author: "Noida Health Team"
                }}
            />
            <LocationPromos
                city="Noida"
                promos={[
                    {
                        title: "Vaccination",
                        newText: "Professional doorstep vaccination",
                        oldText: "",
                        discount: "12% OFF",
                        icon: "syringe",
                        color: "bg-[#003451]"
                    },
                    {
                        title: "Nutrition",
                        newText: "Balanced diet and premium nutrition",
                        oldText: "",
                        discount: "15% OFF",
                        icon: "apple",
                        color: "bg-[#3893c5]"
                    },
                    {
                        title: "Diagnostics",
                        newText: "Regular checkups for robust immunity",
                        oldText: "",
                        discount: "12% OFF",
                        icon: "activity",
                        color: "bg-[#bfe37f]/90"
                    }
                ]}
            />
            <LocationOfferings
                city="Noida"
                services={[
                    { name: "Pet Hostel", desc: "Spacious boarding while you're away.", icon: "home", href: "/pet-boarding" },
                    { name: "Daycare", desc: "Daily play and socialization slots available.", icon: "heart", href: "/#services" },
                    { name: "Pet Vaccination", desc: "Expert at-home immunization in Noida.", icon: "syringe", href: "/pet-vaccinations" },
                    { name: "Veterinary Service", desc: "Doctor home visits for checkups & surgery.", icon: "stethoscope", href: "/#services" }
                ]}
            />
            <div className="bg-[#003451] py-24 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2 space-y-6">
                        <h3 className="text-3xl md:text-5xl font-serif font-bold italic">How pet care impacts quality of life?</h3>
                        <div className="space-y-4 text-white/60 text-lg leading-relaxed">
                            <p>Regular grooming, checkups, and balanced nutrition significantly enhance physical and emotional well-being.</p>
                            <p>A well-nourished pet has a healthy coat, strong bones, and a robust immune system. Regular exercise preventing boredom and anxiety leads to a higher quality of life.</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20">
                            <BookingSection />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
