"use client";
import { usePathname, useRouter } from "next/navigation";
import ArrowDown from "./ArrowDown";
import React, { useState } from "react";

interface ArrowColor {
  arrowColor?: string;
}

const LanguageSwitcher: React.FC<ArrowColor> = ({ arrowColor }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const currentLocale = pathname.startsWith("/en") ? "EN" : "RO";

  const changeLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(ro|en)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const arrowHex = isHovered ? "#11200B" : (arrowColor || "#254119");

  return (
    <div
      style={arrowColor ? { color: arrowColor } : undefined}
      className="relative inline-block group cursor-pointer transition hover:bg-sand-50 rounded-t-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="flex gap-1 items-center w-[58px] group-hover:text-forest-900 rounded-t-sm px-2 py-2">
        {currentLocale} <ArrowDown arrowColor={arrowHex} />
      </p>
      <div
        className="absolute group-hover:opacity-100 opacity-0 w-[58px] transition px-2 py-0.5 left-1/2 -translate-x-1/2 bg-sand-50 text-forest-900 rounded-b-sm z-10"
      >
        <div className="bg-stone-400 w-[42px] h-[1px] mb-2"></div>
        <button
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => changeLocale(currentLocale === "RO" ? "EN" : "RO")}
        >
          {currentLocale === "RO" ? "EN" : "RO"}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;