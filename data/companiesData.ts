import { companiesTypes } from "@/types/companiesTypes";
import ReactIcon from "../components/icons/react"
import NextJsIcon from "../components/icons/nextjs"
import JavascriptIcon from "../components/icons/javascript"
import TailwindIcon from "../components/icons/tailwind"
import TypescriptIcon from "../components/icons/typescript"
// import CssIcon from "../components/icons/css"
import MongoDbIcon from "../components/icons/mongodb"
import ExpressIcon from "../components/icons/express"
// import PrismaIcon from "../components/icons/prisma"
// TODO: Add company logos later

// TODO: Add your actual work experience here. This is a template for future use.
export const companies: companiesTypes[] = [
  {
    name: "Open Source Contributor",
    image: "/globe.svg",
    joinning_date: "Feb 2026",
    end_date: "Present",
    role: "HeroUI - UI Component Library",
    location: "Open Source",
    description: [
      "Identified and resolved critical styling bug in pagination component affecting large page counts (#5860)",
      "Improved pagination layout and alignment for better visual consistency across all page number ranges",
      "Implemented CSS refinements to handle edge cases with 4-5 digit page numbers, ensuring proper spacing and responsive behavior",
      "Followed GitHub workflow: fork, feature branch, pull request (#6034), and code review process",
      "Collaborated with maintainers and addressed feedback to ensure production-ready code",
      "Successfully merged contribution, closing multiple related issues (#5860, #4853) and improving UX for thousands of users",
    ],
    status: true,
    tools:[
      {id:1,name:"TypeScript",icon:TypescriptIcon},
      {id:2,name:"React",icon:ReactIcon},
      {id:3,name:"Tailwind",icon:TailwindIcon}
    ]
  },
  {
    name: "Full Stack Projects (Self-Driven)",
    image: "/globe.svg",
    joinning_date: "2025",
    end_date: "Present",
    role: "Personal Projects",
    location: "Self-Driven",
    description: [
      "Built and deployed full-stack web applications using React, Node.js, and MongoDB",
      "Developed scalable features like authentication, dashboards, and API integrations",
      "Focused on performance optimization and responsive UI/UX design",
      "Implemented clean code practices and modular architecture",
    ],
    status: true,
    tools:[
      {id:1,name:"React",icon:ReactIcon},
      {id:2,name:"Node.js",icon:ExpressIcon},
      {id:3,name:"MongoDB",icon:MongoDbIcon},
      {id:4,name:"Next.js",icon:NextJsIcon}
    ]
  },
];
