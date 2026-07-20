import Image from "next/image";
import Link from "next/link";
import { FileText, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import { GithubIcon } from "lucide-react";
import { socialLinks } from "@/data/socialLinks";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("atish1816@gmail.com"); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Avatar */}
      <div className="relative w-24 h-24">
        <Image src="/assets/batmanProfile.jpg" alt="Atish Kumar" fill className="object-cover rounded-full border border-border ring-4 ring-background" />
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
      </div>

      {/* Intro Text */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Hi, I&apos;m Atish Kumar <span className="text-muted-foreground font-medium">— Full-Stack Engineer</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          I&apos;m a Full-Stack Software Engineer specializing in MERN Stack, Next.JS, Typescript, and AI integrations. I build scalable backends, pixel-perfect frontends, and ship products that solve real problems.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-wrap items-center gap-3 mt-2">
        <Link 
          href="/resume.pdf" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-secondary dark:bg-[#1a1a1a] hover:bg-secondary/80 dark:hover:bg-[#222] border border-border dark:border-white/10 rounded-lg transition-colors text-sm font-medium text-foreground dark:text-white/90"
        >
          <FileText className="w-4 h-4" />
          Resume / CV
        </Link>
        <Link 
          href="https://cal.com/atishkr25" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          Get in touch
        </Link>
        <button 
          onClick={copyEmail}
          className="flex items-center gap-2 px-4 py-2 bg-secondary dark:bg-[#1a1a1a] hover:bg-secondary/80 dark:hover:bg-[#222] border border-border dark:border-white/10 rounded-lg transition-colors text-sm font-medium text-muted-foreground dark:text-white/70"
        >
          <Mail className="w-4 h-4" />
          atish1816@gmail.com
          {copied ? <Check className="w-4 h-4 text-green-500 ml-1" /> : <Copy className="w-4 h-4 ml-1" />}
        </button>
      </div>

      {/* Socials */}
      <div className="mt-6">
        <p className="text-sm text-foreground mb-4">Here are my <span className="font-semibold">socials</span></p>
        <div className="flex flex-wrap gap-2">
          {socialLinks.filter(link => link.label !== "Mail").map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} href={link.href} target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-secondary dark:bg-[#1a1a1a] hover:bg-secondary/80 dark:hover:bg-[#222] border border-border dark:border-white/10 rounded-lg text-xs font-medium text-muted-foreground dark:text-white/70 transition-colors">
                <Icon className="w-3.5 h-3.5" /> {link.label === "Twitter / X" ? "X" : link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
