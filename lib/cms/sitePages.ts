// Every public page of the website. Drives the Admin → SEO tab and the
// /sitemap/page.xml child sitemap. Add a line here when a new page is created.

export type SitePageInfo = { id: string; path: string; label: string };

export const SITE_PAGES: SitePageInfo[] = [
    { id: "home", path: "/", label: "Home" },
    { id: "about", path: "/about", label: "About" },
    { id: "services", path: "/services", label: "Services" },
    { id: "pricing", path: "/pricing", label: "Pricing" },
    { id: "veterinary-doctor", path: "/veterinary-doctor", label: "Veterinary Doctor" },
    { id: "online-vet-consultation", path: "/online-vet-consultation", label: "Online Vet Consultation" },
    { id: "pet-vaccinations", path: "/pet-vaccinations", label: "Pet Vaccinations" },
    { id: "pet-surgery", path: "/pet-surgery", label: "Pet Surgery" },
    { id: "pet-boarding", path: "/pet-boarding", label: "Pet Boarding" },
    { id: "pet-grooming", path: "/pet-grooming", label: "Pet Grooming" },
    { id: "pet-training", path: "/pet-training", label: "Pet Training" },
    { id: "dog-walking", path: "/dog-walking", label: "Dog Walking" },
    { id: "deepet-services-delhi", path: "/deepet-services-delhi", label: "Location: Delhi" },
    { id: "deepet-services-gurgaon", path: "/deepet-services-gurgaon", label: "Location: Gurgaon" },
    { id: "deepet-services-noida", path: "/deepet-services-noida", label: "Location: Noida" },
    { id: "deepet-services-ghaziabad", path: "/deepet-services-ghaziabad", label: "Location: Ghaziabad" },
    { id: "blog", path: "/blog", label: "Blog (list page)" },
    { id: "gallery", path: "/gallery", label: "Gallery" },
    { id: "contact", path: "/contact", label: "Contact" },
    { id: "privacy-policy", path: "/privacy-policy", label: "Privacy Policy" },
    { id: "terms-service", path: "/terms-service", label: "Terms of Service" },
];

export function sitePageById(id: string): SitePageInfo | undefined {
    return SITE_PAGES.find((p) => p.id === id);
}
