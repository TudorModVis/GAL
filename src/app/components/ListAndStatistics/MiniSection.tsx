import React from "react";
import AnimatedLine from "../AnimatedLine";
import AnimatedText from "../AnimatedText";
import LinkWithArrow from "../LinkWithArrow";

const MiniSection = () => {
  return (
    <div className="w-full h-fit mt-40 mb-40 grid grid-cols-full">
      <AnimatedLine customStyles="col-span-full mb-2" />
      <AnimatedText
        text="Vrei să afli mai multe despre structura și funcționarea GAL-ului?"
        customStyles="font-bold leading-4.5 col-span-3"
      />
      <div className="col-span-4">
        <AnimatedText
          text="Descoperă cine sunt oamenii care ghidează activitatea GAL-ului „Stejarul Dacilor” — de la Adunarea Generală până la comisiile executive. Cunoaște structura internă, rolurile și modul în care luăm decizii pentru comunitate."
          customStyles="leading-4.5 col-span-4 mb-6"
        />
        <LinkWithArrow
          text="Conducerea GAL-ului"
          href="/"
          arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
      <div className="col-span-4">
        <AnimatedText
          text="Transparența este esențială. Accesează statutul, strategiile, rapoartele anuale și alte documente-cheie care definesc direcția și angajamentele noastre față de localitățile din regiune."
          customStyles="leading-4.5 col-span-4 mb-6"
        />
        <LinkWithArrow
          text="Documente Oficiale"
          href="/"
          arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
    </div>
  );
};

export default MiniSection;
