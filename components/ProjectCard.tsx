"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Dialog, DialogTrigger } from "./ui/dialog";
import Link from "next/link";
import { projectTypes, skillTypes } from "@/types/projectTypes";
import { Github, Globe, Play } from "lucide-react";
import { motion } from "framer-motion";
import VideoComponent from "./ui/VideoComponent";

const MAX_TILT_DEG = 16;

const ProjectCard = ({ data, index }: { data: projectTypes; index?: number }) => {
  const [isVideo, setisVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTiltEnabled, setIsTiltEnabled] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ clientX: 0, clientY: 0 });
  const frameRef = useRef<number | null>(null);

  const canTilt = useCallback(() => {
    if (typeof window === "undefined") return false;

    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const supports3D =
      typeof CSS !== "undefined" &&
      CSS.supports("transform-style", "preserve-3d") &&
      CSS.supports("perspective", "1200px");

    return window.innerWidth >= 640 && hasFinePointer && supports3D;
  }, []);

  const updateTilt = useCallback(() => {
    if (!cardRef.current || !glareRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = pointerRef.current.clientX - rect.left;
    const y = pointerRef.current.clientY - rect.top;

    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));

    const percentX = (clampedX / rect.width) * 100;
    const percentY = (clampedY / rect.height) * 100;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normalizedX = (clampedX - centerX) / centerX;
    const normalizedY = (clampedY - centerY) / centerY;

    const rotateY = normalizedX * MAX_TILT_DEG;
    const rotateX = -normalizedY * MAX_TILT_DEG;
    const distanceFromCenter = Math.min(1, Math.hypot(normalizedX, normalizedY));

    cardRef.current.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.webkitTransform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    glareRef.current.style.setProperty("--glare-x", `${percentX}%`);
    glareRef.current.style.setProperty("--glare-y", `${percentY}%`);
    glareRef.current.style.opacity = `${distanceFromCenter * 0.35}`;

    frameRef.current = null;
  }, []);

  const resetTilt = useCallback(() => {
    if (!cardRef.current || !glareRef.current) return;

    cardRef.current.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg)";
    cardRef.current.style.webkitTransform = "translateZ(0) rotateX(0deg) rotateY(0deg)";
    glareRef.current.style.setProperty("--glare-x", "50%");
    glareRef.current.style.setProperty("--glare-y", "50%");
    glareRef.current.style.opacity = "0";
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isTiltEnabled) return;

    pointerRef.current = { clientX: event.clientX, clientY: event.clientY };
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(updateTilt);
    }
  };

  const handlePointerEnter = () => {
    if (!isTiltEnabled) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    resetTilt();
  };

  useEffect(() => {
    const updateCapability = () => {
      const nextTiltEnabled = canTilt();
      setIsTiltEnabled(nextTiltEnabled);
      if (!nextTiltEnabled) {
        setIsHovered(false);
        resetTilt();
      }
    };

    updateCapability();
    window.addEventListener("resize", updateCapability);

    return () => {
      window.removeEventListener("resize", updateCapability);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [canTilt, resetTilt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.1 }}
      whileHover={{ y: -4 }}
      className="w-full h-full"
    >
      {/* Simple Border Wrapper */}
      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col"
        style={{ perspective: "1200px", WebkitPerspective: "1200px" }}
      >
        <Card
          ref={cardRef}
          className="border-0 rounded-2xl overflow-hidden relative bg-card hover:shadow-xl transition-all duration-300 flex flex-col h-full will-change-transform"
          style={{
            transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            WebkitTransform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transition: isTiltEnabled && isHovered
              ? "transform 90ms linear, box-shadow 300ms ease"
              : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease",
          }}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >

          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-20 hidden sm:block rounded-2xl"
            style={{
              opacity: 0,
              transition: "opacity 250ms ease",
              background:
                "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0) 60%)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          <CardContent className="p-0 flex flex-col flex-1">
            {/* Image Container */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <Image
                  src={data.img}
                  width={400}
                  height={200}
                  className="w-full object-cover rounded-t-2xl h-36 sm:h-38 md:h-42 lg:h-48"
                  alt={`${data.name} project image`}
                />
              </motion.div>

              {/* Overlay on Hover - Desktop/Tablet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/40 hidden sm:flex items-center justify-center gap-3 sm:gap-4 rounded-t-2xl"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isHovered ? 1 : 0.8,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={data.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </Link>
                </motion.div>

                {data.video && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: isHovered ? 1 : 0.8,
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Dialog>
                      <DialogTrigger
                        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                        onClick={() => setisVideo(true)}
                      >
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white" />
                      </DialogTrigger>
                      <VideoComponent isVideo={isVideo} video={data.video} />
                    </Dialog>
                  </motion.div>
                )}

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isHovered ? 1 : 0.8,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={data.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 md:p-5 space-y-3 flex-1 flex flex-col bg-secondary">
              {/* Title and Links */}
              <div className="flex gap-2 sm:gap-3 items-start justify-between">
                <motion.h3
                  className="text-sm sm:text-base md:text-base font-semibold text-foreground flex-1 min-w-0"
                  whileHover={{ x: 2 }}
                >
                  <span className="break-words">{data.name}</span>
                </motion.h3>

                {/* Links - Always Visible */}
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href={data.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md hover:bg-accent/50 transition-colors"
                      aria-label="Visit live site"
                    >
                      <Globe className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href={data.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md hover:bg-accent/50 transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                {data.description}
              </p>

              {/* Technologies Section */}
              <div className="space-y-3 mt-auto pt-2 border-t border-border/30">
                <p className="text-xs text-muted-foreground">Technologies</p>
                <TooltipProvider delayDuration={300}>
                  <div className="flex items-center gap-2.5">
                    {data?.tech?.map((tech: skillTypes) => (
                      <Tooltip key={tech.id}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                            {tech.icon && <div className="w-5 h-5 flex-shrink-0"><tech.icon /></div>}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="text-xs">{tech.name}</span>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
                
                {/* Status and View Details */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs text-muted-foreground">All Systems Operational</span>
                  </div>
                  <Link
                    href={data.live_link}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    View Details <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProjectCard;