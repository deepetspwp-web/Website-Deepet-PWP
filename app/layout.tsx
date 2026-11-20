import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Poppins, Geist_Mono, Noto_Serif } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import { BackToTop } from "@/components/layout/BackToTop";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";
import { ThemeOptionsProvider } from "@/components/providers/ThemeOptionsProvider";
import { getThemeOptions } from "@/lib/cms";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deepetservices.com";

// Per-page SEO comes from Admin → SEO (rendered by <SeoHead>); blog posts set
// their own metadata from the fields in Admin → Blogs.
export async function generateMetadata(): Promise<Metadata> {
  const theme = await getThemeOptions();
  const siteName = theme?.company.siteTitle || "DeePet Services";

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    icons: {
      icon: theme?.company.favicon || "/favicon.ico",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#003451",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeOptions = await getThemeOptions();
  const gtmId = themeOptions?.analytics.gtmId?.trim();

  return (
    <html lang="en">
      <head>
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} ${notoSerif.variable} antialiased`}
      >
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ThemeOptionsProvider value={themeOptions}>
          <ReCaptchaProvider>
            <SmoothScrolling>
              {children}
            </SmoothScrolling>
          </ReCaptchaProvider>
        </ThemeOptionsProvider>
        <BackToTop />
      </body>
    </html>
  );
}
