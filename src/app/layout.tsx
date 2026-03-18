import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ContactModalProvider } from "@/context/ContactModalContext";
import ContactModal from "@/components/ContactModal";
import CookieBanner from "@/components/CookieBanner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xerebo | Dubai Digital Marketing Agency | Drives Real Leads",
  description: "Tired of low-quality leads and wasted ad spend? Xerebo, a digital marketing agency in Dubai, building industry-specific systems that drive predictable revenue",
  metadataBase: new URL('https://xerebo.com'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Xerebo | Dubai Digital Marketing Agency | Drives Real Leads",
    description: "Tired of low-quality leads and wasted ad spend? Xerebo, a digital marketing agency in Dubai, building industry-specific systems that drive predictable revenue",
    url: 'https://xerebo.com',
    siteName: 'Xerebo Technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xerebo Technologies Preview',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
              });
            `,
          }}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MPFRV699');`}
        </Script>
      </head>
      <body className="antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/external/ns.html?id=GTM-MPFRV699"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ContactModalProvider>
          {children}
          <ContactModal />
          <CookieBanner />
        </ContactModalProvider>
      </body>
    </html>
  );
}
