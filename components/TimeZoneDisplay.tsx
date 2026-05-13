"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function TimeZoneDisplay() {
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState("");
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        setMounted(true);

        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setTime(`${hours}:${minutes}`);

            // Get timezone info - Delhi is always shown as requested
            const offset = -330; // IST is GMT+5:30, so offset is -330 minutes
            const offsetHours = 5;
            const offsetMinutes = 30;
            const gmtOffset = `GMT+${offsetHours}:${offsetMinutes}`;
            setTimezone(`Delhi (${gmtOffset})`);
        };

        updateTime();
        const timer = setInterval(updateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-muted/50">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-mono text-muted-foreground">--:--</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-muted/30 border border-border/30">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-mono tabular-nums text-foreground font-medium">
                {time}
            </span>
            {/* Show timezone abbreviation on tablet, full on desktop */}
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">
                • {timezone}
            </span>
        </div>
    );
}
