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
      className=""
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >

      {/* Footer */}
      <motion.div
        className="flex flex-col items-center justify-center text-center mt-28 mb-10 gap-1.5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-sm sm:text-base text-muted-foreground">
          Design & Developed by <span className="font-semibold text-foreground">Atish Kumar</span>
        </p>
        <p className="text-sm sm:text-base text-muted-foreground">© 2026. All rights reserved.</p>
      </motion.div>
    </motion.div>
  );
}
