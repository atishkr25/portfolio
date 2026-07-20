"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { calconfig } from "@/config/calconfig";

export function Contact() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="flex justify-center my-10">
      <div className="w-full max-w-2xl border border-dashed border-border dark:border-white/20 rounded-xl p-10 flex flex-col items-center justify-center gap-6">
        <h2 className="text-xl sm:text-2xl text-muted-foreground text-center">
          Hey, you scrolled this far, let&apos;s talk.
        </h2>
        
        <button 
          data-cal-namespace={calconfig.namespace}
          data-cal-link={calconfig.link}
          data-cal-config={JSON.stringify(calconfig.config)}
          className="group flex items-center gap-2 bg-secondary dark:bg-[#2F2F2F] hover:bg-secondary/80 dark:hover:bg-[#3A3A3A] border border-border dark:border-white/5 rounded-full px-4 py-2 text-sm sm:text-base font-medium text-foreground transition-all duration-500"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full overflow-hidden relative border border-border dark:border-white/10 flex-shrink-0">
               <Image src="/assets/batmanProfile.jpg" alt="Avatar" fill className="object-cover" />
            </span>

            <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-20 group-hover:opacity-100 transition-all duration-500 ease-out">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none text-muted-foreground">+</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 text-[10px] font-medium text-foreground flex-shrink-0">
                  You
                </span>
              </span>
            </span>
          </span>
          <span className="font-semibold text-foreground/90">Book a Meeting</span>
        </button>
      </div>
    </div>
  );
}
