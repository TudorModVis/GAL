"use client";
import { usePathname, useRouter } from "next/navigation";
import ArrowDown from "./ArrowDown";

interface ArrowColor {
  arrowColor?: string;
}

const LanguageSwitcher: React.FC<ArrowColor> = ({ arrowColor }) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.startsWith("/en") ? "EN" : "RO";
  
  const changeLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(ro|en)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div style={arrowColor ? { color: arrowColor } : undefined} className={`relative inline-block group cursor-pointer`}>
      <p className="flex gap-1 items-center">
        {currentLocale} <ArrowDown arrowColor={arrowColor}/>
      </p>
      <div className={`absolute group-hover:opacity-100 opacity-0 transition ${arrowColor === "#11200B" ? "text-sand-50 bg-forest-900" : "text-forest-900 bg-sand-50"} px-2 py-0.5 left-1/2 -translate-x-1/2 rounded-xs min-w-[42px] z-10`}>
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
