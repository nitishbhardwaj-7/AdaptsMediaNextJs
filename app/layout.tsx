import type { Metadata } from "next";
import { Roboto, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

import SmoothScroll from "@/components/providers/SmoothScroll";
import Script from "next/script";

import localFont from "next/font/local";

const openSans = localFont({
  src: [
    {
      path: "../public/fonts/OpenSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  preload: true,
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(
      `https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(2000) }
    );

    if (response.ok) {
      const data = await response.json();
      const yoast = data?.json;
      if (yoast) {
        return {
          metadataBase: new URL('https://adaptsmedia.com'),
          title: {
            default: yoast.title || "Adapts Media",
            template: "%s"
          },
          description: yoast.description,
          openGraph: {
            title: yoast.og_title,
            description: yoast.og_description,
            siteName: yoast.og_site_name,
            images: [
              {
                url: yoast.og_image?.[0]?.url || "/default-og.jpg",
              }
            ],
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: yoast.twitter_title,
            description: yoast.twitter_description,
            images: [yoast.twitter_image || yoast.og_image?.[0]?.url],
          },
          robots: yoast.robots?.index === 'noindex' ? 'noindex, nofollow' : 'index, follow',
        };
      }
    }
  } catch (error) {
    // Fallback if API fails or yoast object is missing
  }

  return {
    title: "Adapts Media | Digital Marketing Agency",
    description: "Expert digital marketing solutions in Dubai and globally."
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${roboto.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body>
        <SmoothScroll>
          <Navbar />
          <main style={{ paddingTop: '0px' }}>
            {children}
          </main>
        </SmoothScroll>
        {/* Google Tag Manager - Loads only after the page is interactive */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WQDF4T6');`}
        </Script>
      </body>
    </html>
  );
}

