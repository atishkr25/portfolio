"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../custom-hooks/useSound";
import { useEffect, useState } from "react";

const clickSoundUrl = "/sound/torchsound.mp3";

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
    playSound();
    setTheme(isDark ? "light" : "dark");
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
      whileTap={{ scale: 0.9, x: [0, -3, 3, -3, 3, 0] }}
      transition={{ duration: 0.2 }}
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
