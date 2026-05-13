"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../custom-hooks/useSound";
import { useEffect, useState } from "react";

const clickSoundUrl = "/sound/click.mp3";

function applyThemeTransition() {
  if (typeof window === "undefined") return;

  const id = "theme-clip-transition";
  let style = document.getElementById(id) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.head.appendChild(style);
  }

  style.textContent = `
    ::view-transition-group(root) {
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }

    ::view-transition-new(root) {
      animation-name: reveal-light;
    }

    .dark::view-transition-new(root) {
      animation-name: reveal-dark;
    }

    ::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }

    @keyframes reveal-light {
      from { clip-path: circle(0% at 50% 50%); }
      to { clip-path: circle(100% at 50% 50%); }
    }

    @keyframes reveal-dark {
      from { clip-path: circle(0% at 50% 50%); }
      to { clip-path: circle(100% at 50% 50%); }
    }
  `;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { playSound } = useSound(clickSoundUrl);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;

  const handleToggle = () => {
    applyThemeTransition();

    const switchTheme = () => {
      playSound();
      setTheme(isDark ? "light" : "dark");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  };

  if (!mounted) {
    return (
      <div className="relative flex items-center justify-center w-9 h-9 rounded-lg
        bg-secondary/50
        border border-border/50
        transition-colors duration-200">
        <Sun className="w-4 h-4" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg
        bg-secondary/50 hover:bg-secondary/80
        border border-border/50 hover:border-border
        transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
