import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Oneko from "@/components/Oneko";
import LiquidBackground from "@/components/LiquidBackground";
import UmamiAnalytics from "@/components/Umami";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next"
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atish | Full-Stack Engineer",
  description:
    "Portfolio of Atish, a versatile Full-Stack Engineer, Frontend Developer, Backend Expert, and AI Engineer. Specializing in React, Node.js, TypeScript, Next.js, and AI integrations.",
  keywords: [
    "Atish",
    "Atish Kumar",
    "Full Stack Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "AI Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "MERN Stack",
    "Web Developer",
    "Portfolio",
    "Hire Software Engineer"
  ],
  authors: [{ name: "Atish" }],
  creator: "Atish",
  icons: {
    icon: "/assets/batmanfavicon.jpg",
    apple: "/assets/batmanfavicon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atishkumar.me",
    siteName: "Atish Portfolio",
    title: "Atish | Full-Stack Engineer",
    description:
      "Versatile Full-Stack Engineer, Frontend, Backend, and AI Developer building scalable, modern web applications and AI solutions.",
    images: [
      {
        url: "/atishprofilepic.jpg",
        width: 1200,
        height: 630,
        alt: "Atish - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atish | Full-Stack Engineer",
    description:
      "Versatile Full-Stack Engineer, Frontend, Backend, and AI Developer building scalable, modern web applications.",
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
  jobTitle: ["Full-Stack Engineer", "Frontend Developer", "Backend Developer", "AI Engineer"],
  worksFor: {
    "@type": "Organization",
    name: "Open to Work"
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
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js" strategy="beforeInteractive" />
      </head>
      <body suppressHydrationWarning className={`${hankenGrotesk.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <Analytics />
          {process.env.NODE_ENV === "production" && <UmamiAnalytics />}
          <LiquidBackground />
          <Oneko />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
