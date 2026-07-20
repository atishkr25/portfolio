"use client";
import React, { useEffect, useState } from 'react';

const quotes = [
  { text: "A man who is master of patience is master of everything else.", author: "George Savile" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
];

const Footer = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <footer className="flex flex-col items-center justify-center gap-16 pb-20 pt-10">
      <div className="relative w-full max-w-2xl p-8 rounded-2xl border border-border dark:border-white/5 bg-card dark:bg-white/[0.02] overflow-hidden">
        <div className="absolute top-4 left-4 text-7xl font-serif text-muted-foreground/20 dark:text-white/10 opacity-50 select-none leading-none">
          &ldquo;
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-end justify-between px-4 pt-6">
          <p className="text-sm sm:text-base italic text-muted-foreground max-w-[280px] sm:max-w-sm">
            &quot;{quote.text}&quot;
          </p>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            — {quote.author}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 text-xs sm:text-sm text-muted-foreground">
        <p>
          Built with <span className="text-red-500">❤️</span> by <span className="font-medium text-foreground">Atish Kumar</span>
        </p>
        <p>© {new Date().getFullYear()}. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
