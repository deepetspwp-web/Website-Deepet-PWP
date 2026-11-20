import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { InstagramGallery } from "@/components/gallery/InstagramGallery";
import { getGalleryImages } from "@/lib/cms";
import { SeoHead } from "@/components/seo/SeoHead";

export default async function GalleryPage() {
    const images = await getGalleryImages();

    return (
        <main className="min-h-screen">
            <SeoHead uri="gallery" fallback={{ title: "Gallery - DeePet Services | Pet Care Moments", description: "Browse our gallery showcasing adorable pet care moments, happy pets, and behind-the-scenes at DeePet Services." }} />
            <Navbar />
            <div className="pt-12">
                <InstagramGallery images={images} />
            </div>
            <Footer />
            <MobileStickyCTA />
        </main>
    );
}
