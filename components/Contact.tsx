"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/data/socialLinks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VisitorCounter from "./VisitorCount";
import { motion } from "framer-motion";

interface FormInput {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const { handleSubmit, register } = useForm<FormInput>();
  const handleOnSumbit: SubmitHandler<FormInput> = (data) => { };

  return (
    <motion.div
      className="pt-6 sm:pt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >

      {/* Footer */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-12 sm:mt-16 pt-3 border-t border-border/70 dark:border-border/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Socials */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Here are my socials</p>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider delayDuration={0}>
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-md 
                                border border-border/70 bg-background hover:bg-accent/60
                                px-4 py-1.5 transition-all duration-200
                                hover:scale-105 hover:shadow-md dark:border-border dark:bg-card dark:hover:bg-accent/50"
                    >
                      <Icon className="w-5 h-5 text-foreground" />
                      <span className="hidden text-sm">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </TooltipProvider>
          </div>
        </div>

        {/* Design Info */}
        <div className="flex flex-col items-start sm:items-end text-right">
          <p className="text-sm text-muted-foreground">
            Design & Developed by <span className="font-semibold font-mono text-foreground">Atish</span>
          </p>
          <p className="text-sm text-muted-foreground">© 2026. All rights reserved.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
