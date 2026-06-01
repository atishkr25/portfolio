"use client";
import React, { useEffect, useRef } from 'react';

export default function LiquidBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: any = null;

    // The scripts are loaded via Next.js <Script> in layout.tsx using beforeInteractive
    // so window.VANTA is guaranteed to be available instantly.
    // @ts-ignore
    if (window.VANTA && window.VANTA.TOPOLOGY) {
      // @ts-ignore
      effect = window.VANTA.TOPOLOGY({
        el: vantaRef.current,
        mouseControls: false, // Disabled to prevent heavy distortions and keep it calm
        touchControls: false, 
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x4a4a4a, // Sleek grey
        backgroundColor: 0x0
      });
    }

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        opacity: 0.25, // Makes the lines very faint ("halki halki")
        pointerEvents: "none", // Ensures it doesn't block clicks
      }}
    />
  );
}
