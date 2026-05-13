"use client";
import Link from "next/link";
import React from "react";
import Nav from "./Nav";
import { ThemeToggle } from "./ThemeToggle";
import { TimeZoneDisplay } from "./TimeZoneDisplay";

const Header = () => {
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <Link href={"#"} className="group">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium transition-transform duration-200 group-hover:scale-105">
            Atish{" "}
            <span className="text-red-600 dark:text-red-500 rounded-lg transition-colors">.</span>
          </p>
        </Link>

        {/* Desktop nav - xl and above */}
        <div className="hidden xl:flex items-center gap-4">
          <TimeZoneDisplay />
          <Nav />
          <ThemeToggle />
        </div>

        {/* Tablet/Mobile controls */}
        <div className="flex xl:hidden items-center gap-2 sm:gap-3">
          <TimeZoneDisplay />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
