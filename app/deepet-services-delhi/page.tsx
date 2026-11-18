import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { LocationHero } from "@/components/locations/LocationHero";
import { LocationIntro } from "@/components/locations/LocationIntro";
import { LocationOfferings } from "@/components/locations/LocationOfferings";
import { LocationPromos } from "@/components/locations/LocationPromos";
import { BookingSection } from "@/components/home/BookingSection";
import { SeoHead } from "@/components/seo/SeoHead";

export default function DelhiPage() {
    return (
        <main className="min-h-screen">
            <SeoHead uri="deepet-services-delhi" fallback={{ title: "Premium Doorstep Pet Care Services Delhi | DeePet Services", description: "Expert at-home pet care services in Delhi including vet home visits, vaccinations, pet surgery, and boarding. 10+ years experience, trusted by 1000+ pet parents." }} />
            <Navbar />
            <LocationHero
                city="Delhi"
                title="Premium Doorstep Pet Care Services Delhi"
                services={[
                    "Veterinary Services in Delhi",
                    "Pet Vaccination Services in Delhi",
                    "Pet Boarding Services in Delhi",
                    "Pet Surgery Services in Delhi",
                    "Online Vet Consultation in Delhi"
                ]}
            />
            <LocationIntro
                city="Delhi"
                paragraphs={[
                    "When you are going away from your town or extremely busy in your work, do you worry about your pet? Are you struggling to find a trustworthy and reliable pet care services in Delhi? Then you have landed at the right page, we at DeePet understand the stress and anxiety that peaks in when you leave your furry friend behind.",
                    "We have been serving pets for more than 10 years now and we know how to take care of your pet to keep them safe and healthy. Our professional and experienced team of pet care takers is ready to help you with top notch pet care hands at home. Our most popular pet care services is vet doctor home visit, pet vaccination, online vet consultation, pet surgery & boarding service.",
                    "So, if you are also looking to book one of the above mention pet care services from the comfort of your home then contact us now or you can follow this post till the end. We are going to explain about the services offered, and packages."
                ]}
                highlightText="At-home Pet Care Services Delhi. Expert caring hands with personalized attention and convenience."
                testimonial={{
                    text: "Most of our clients in Dwarka & South Delhi book early morning services to ensure their pet is happy before they start their day.",
                    author: "DeePet Operations Team"
                }}
            />
            <LocationPromos
                city="Delhi"
                promos={[
                    {
                        title: "Vaccination",
                        newText: "Protect your pet with our expert vaccination services",
                        oldText: "",
                        discount: "20% OFF",
                        icon: "syringe",
                        color: "bg-[#003451]"
                    },
                    {
                        title: "Nutrition for Pets",
                        newText: "Proper nutrition is essential for overall health",
                        oldText: "",
                        discount: "25% OFF",
                        icon: "apple",
                        color: "bg-[#3893c5]"
                    },
                    {
                        title: "Diagnostic Services",
                        newText: "In-house testing for fast and reliable results",
                        oldText: "",
                        discount: "20% OFF",
                        icon: "activity",
                        color: "bg-[#bfe37f]/90"
                    }
                ]}
            />
            <LocationOfferings
                city="Delhi"
                services={[
                    { name: "Veterinary Service", desc: "Expert home visits for checkups and surgery.", icon: "stethoscope", href: "/#services" },
                    { name: "Pet Vaccination", desc: "Stress-free immunization at your doorstep.", icon: "syringe", href: "/pet-vaccinations" },
                    { name: "Pet Boarding", desc: "Safe, hygienic boarding across Delhi NCR.", icon: "home", href: "/pet-boarding" },
                    { name: "Pet Surgery", desc: "Specialized surgical care for dogs & cats.", icon: "heart", href: "/pet-surgery" }
                ]}
            />
            <div className="bg-[#f8fafc] py-24">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h3 className="text-3xl font-serif font-bold text-[#003451]">Visit Our Office</h3>
                    <p className="text-gray-500 font-medium max-w-lg mx-auto">
                        Shop no. 244, 2nd floor, Vardhman Plus City Mall, Plot No. 2, <br />
                        Dwarka Sector 23, New Delhi - 110075
                    </p>
                    <BookingSection />
                </div>
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
