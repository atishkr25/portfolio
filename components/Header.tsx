"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="relative w-10 h-10 rounded-xl overflow-hidden border border-border dark:border-white/10 hover:opacity-80 transition-opacity shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Image src="/assets/batmanProfile.jpg" alt="Atish" fill className="object-cover" />
          </Link>
          
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <Link href="#work" className="hover:text-foreground transition-colors">Work</Link>
            <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="#achievements" className="hover:text-foreground transition-colors">Achievements</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
