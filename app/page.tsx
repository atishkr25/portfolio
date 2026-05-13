"use client";
import Header from "@/components/Header";
import Main from "@/components/Main";
import MobiNav from "@/components/MobiNav";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="lg:max-w-4xl px-4 pb-8 mx-auto animate-fade-in-blur ">
      <div className="">
        <motion.div
          className=" sticky top-0 left-0 right-0 h-1 bg-red-700 origin-left z-50"
          style={{ scaleX }}
        />
        <div className="sticky top-0 z-50 backdrop-blur-md bg-background/60">
          <Header />
        </div>
        <Main />

        {/* For now not decided which things will add inside mobile nav  */}
        <div className="xl:hidden sticky bottom-0 z-50 backdrop-blur-md">
          <MobiNav />
        </div>
      </div>
    </div>
  );
}