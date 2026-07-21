import Image from "next/image";
import Link from "next/link";
import { FileText, Mail, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { GithubIcon } from "lucide-react";
import { socialLinks } from "@/data/socialLinks";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("Atish Kumar");
  const originalName = "Atish Kumar";
  const letters = "無空日中生水天火地風山川木土金月年月水火風土神龍刀剣";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNameHover = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setName(
        originalName
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalName[index];
            }
            if (originalName[index] === " ") return " ";
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= originalName.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    handleNameHover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("atish1816@gmail.com"); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Avatar */}
      <div className="relative w-24 h-24 group cursor-default">
        <Image src="/assets/batmanProfile.jpg" alt="Atish Kumar" fill className="object-cover rounded-full border border-border ring-4 ring-background transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 pointer-events-none z-10 flex flex-col items-center">
          <div className="bg-foreground text-background text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl flex items-center gap-2 border border-border/20">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             Available for work
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-foreground mt-[1px]"></div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Hi, I&apos;m <span onMouseEnter={handleNameHover} className="cursor-default inline-block">{name}</span> <span className="text-muted-foreground font-medium">— Full-Stack Engineer</span>
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
