import { projectTypes } from "@/types/projectTypes";
import sahayak from "../public/Projects/sahayak.png";
import urlshortener from "../public/Projects/urlshortener.png";
import movieapp from "../public/Projects/movieapp.png";
import NextJs from "@/components/icons/nextjs";
import Tailwind from "@/components/icons/tailwind";
import Typescript from "@/components/icons/typescript";
import Motion from "@/components/icons/motion";
import React from "@/components/icons/react";
import Javascript from "@/components/icons/javascript";
import ExpressJs from "@/components/icons/express";
import MongoDB from "@/components/icons/mongodb";
import Nodejs from "@/components/icons/nodejs";
export const ProjectDetails: projectTypes[] = [
  {
    id: 1,
    name: "Sahayak",
    description:
      "A full-stack crowdfunding platform built for creators, nonprofits, and entrepreneurs — with secure payments, real-time campaign analytics, and beautiful UX out of the box.",
    tech: [
      {
        id: 0,
        name: "Next.js",
        icon: NextJs,
      },
      {
        id: 1,
        name: "Tailwind",
        icon: Tailwind,
      },
      {
        id: 2,
        name: "Typescript",
        icon: Typescript,
      },
      {
        id: 3,
        name: "Motion",
        icon: Motion,
      },
      {
        id: 4,
        name: "React",
        icon: React,
      },
      {
        id: 5,
        name: "Javascript",
        icon: Javascript,
      },
      {
        id: 6,
        name: "ExpressJs",
        icon: ExpressJs,
      },
      {
        id: 7,
        name: "MongoDB",
        icon: MongoDB,
      },
      {
        id: 9,
        name: "Nodejs",
        icon: Nodejs,
      },
    ],
    live_link: "https://usesahayak.vercel.app/",
    github_link: "https://github.com/atishkr25/UseSahayak",
    img: sahayak,

  },
  {
    id: 2,
    name: "Linksnip",
    description:
      "A full-stack URL Shortener application with user authentication and analytics features. Generate short URLs, track detailed analytics (total clicks, unique countries, device/browser breakdown), QR code support, custom slugs, Redis caching, and rate limiting.",
    tech: [
      {
        id: 0,
        name: "Javascript",
        icon: Javascript,
      },
      {
        id: 1,
        name: "ExpressJs",
        icon: ExpressJs,
      },
      {
        id: 2,
        name: "MongoDB",
        icon: MongoDB,
      },
      {
        id: 3,
        name: "Nodejs",
        icon: Nodejs,
      },
    ],
    live_link: "#",
    github_link: "https://github.com/atishkr25/Url_shortener",
    img: urlshortener,
  },
  {
    id: 3,
    name: "Movie App",
    description:
      "A movie browsing web app powered by TMDB API where users can explore popular movies, search by title, view details, and save favorites. Features dark/light mode toggle and responsive design.",
    tech: [
      {
        id: 0,
        name: "React",
        icon: React,
      },
      {
        id: 1,
        name: "Javascript",
        icon: Javascript,
      },
      {
        id: 2,
        name: "Tailwind",
        icon: Tailwind,
      },
    ],
    live_link: "https://get-popular-movies.netlify.app/",
    github_link: "https://l1nq.com/x8f8wba",
    img: movieapp,
  },
];