'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import myimg from "../public/assets/batmanProfile.jpg";

import ReactIcon from "./icons/react";
import NextJsIcon from "./icons/nextjs";
import TypeScriptIcon from "./icons/typescript";
import JavaScriptIcon from "./icons/javascript";
import TailwindIcon from "./icons/tailwind";
import ReduxIcon from "./icons/redux";
import MongoDBIcon from "./icons/mongodb";
import NodeJsIcon from "./icons/nodejs";
import ExpressIcon from "./icons/express";
import FigmaIcon from "./icons/figma";
import PrismaIcon from "./icons/prisma";
import VercelIcon from "./icons/vercel";

const AboutMe = () => {
  const skills = [
    { name: 'React', icon: ReactIcon },
    { name: 'Next.js', icon: NextJsIcon },
    { name: 'TypeScript', icon: TypeScriptIcon },
    { name: 'JavaScript', icon: JavaScriptIcon },
    { name: 'Tailwind CSS', icon: TailwindIcon },
    { name: 'Redux', icon: ReduxIcon },
    { name: 'Node.js', icon: NodeJsIcon },
    { name: 'Express', icon: ExpressIcon },
    { name: 'MongoDB', icon: MongoDBIcon },
    { name: 'Prisma', icon: PrismaIcon },
    { name: 'Figma', icon: FigmaIcon },
    { name: 'Vercel', icon: VercelIcon },
  ];

  return (
    <section>
      <p className="text-start text-sm text-muted-foreground mt-1">About</p>
      <h2 className="text-xl font-semibold text-foreground">Me</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 flex flex-col sm:flex-row items-start gap-6 sm:gap-10 w-full"
      >
        {/* Profile Image Column */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-[260px] md:h-[260px] flex-shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={myimg}
            alt="Atish Kumar Profile"
            className="w-full h-full object-cover"
            width={280}
            height={280}
            priority
          />
        </div>

        {/* Content Column */}
        <div className="flex-1 text-start space-y-4 pt-1">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground">
              Atish Kumar
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              I'm a Frontend Developer building full-stack applications with React, Next.js, and TypeScript. I love creating clean, user-friendly interfaces and solving real-world problems. Currently exploring Data Structures, Algorithms, and Competitive Programming.
            </p>
          </div>

          {/* Skills Area */}
          <div className="space-y-2 pt-1">
            <h4 className="text-sm font-semibold text-foreground">
              Skills
            </h4>
            <TooltipProvider delayDuration={200}>
              <div className="flex flex-wrap items-center gap-3">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          <Icon />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="text-xs font-medium">{skill.name}</span>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
