import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Oneko from "@/components/Oneko";
import UmamiAnalytics from "@/components/Umami";
import { ThemeProvider } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next"
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atish Kumar | Full-Stack Developer",
  description:
    "I build scalable backend systems and solve complex problems using C++, Node.js, and modern web technologies.",
  keywords: [
    "Atish Kumar",
    "Backend Developer",
    "DSA Enthusiast",
    "Full Stack Developer",
    "Node.js Developer",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Atish Kumar" }],
  creator: "Atish Kumar",
  icons: {
    icon: "/favicon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atishkumar.me",
    siteName: "Atish Kumar Portfolio",
    title: "Atish Kumar | Backend Developer & DSA Enthusiast",
    description:
      "I build scalable backend systems and solve complex problems using C++, Node.js, and modern web technologies.",
    images: [
      {
        url: "/atishprofilepic.jpg",
        width: 1200,
        height: 630,
        alt: "Atish Kumar - Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atish Kumar | Backend Developer",
    description:
      "Backend Developer building scalable systems with C++, Node.js, and modern web technologies.",
    images: ["/atishprofilepic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Atish Kumar",
  url: "https://atishkumar.me",
  image: "/atishprofilepic.jpg",
  jobTitle: "Backend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance"
  },
  sameAs: [
    "https://linkedin.com/in/atish-kumar",
    "https://github.com/atish",
    "https://x.com/atish"
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="AYB9VEKLwESlSCH8mrHaL2P52FaHBZwVzRRomDup9Nc" />
      </head>
      <body suppressHydrationWarning className={`${hankenGrotesk.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <Analytics />
          {process.env.NODE_ENV === "production" && <UmamiAnalytics />}
          <Oneko />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
