import React from "react";
import AnimatedHeader from "../AnimatedHeader";
import AnimatedText from "../AnimatedText";
import LinkWithArrow from "../LinkWithArrow";
import AnimatedLine from "../AnimatedLine";
import AnimatedCounter from "../AnimatedCounter";
import MiniSection from "./MiniSection";

const MainSection = () => {
  return (
    <>
      <section className="grid w-screen h-fit gap-[24px] grid-cols-donation mt-24">
        <div className="col-span-12 flex flex-col justify-between">
          <div className="w-full">
            <AnimatedHeader
              text="Lista și statistica membrilor GAL-ului Stejarul Dacilor"
              customStyles="leading-13 text-5xl font-bold mb-12"
            />
            <AnimatedText
              text="Grupul de Acțiune Locală „Stejarul Dacilor” este o asociație constituită în noiembrie 2023, care reunește 14 unități administrativ-teritoriale din raioanele Cimișlia și Căușeni, având scopul de a promova dezvoltarea rurală durabilă implementând Strategiei de Dezvoltare Locală 2023–2027."
              customStyles="leading-4.5 mb-6"
            />

            <LinkWithArrow
              text="Harta resurselor"
              href="/"
              arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
              customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
            />
          </div>
          <div className="w-full grid grid-cols-6 gap-[24px]">
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText text="Nr. total membri" customStyles="mt-2 mb-10" />
              <AnimatedCounter from={0} to={29} />
            </div>
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text="Nr. membri din sectorul antreprenorial"
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={12} />
            </div>
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text="Nr. membri din sectorul public"
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={11} />
            </div>
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text="Nr. membri din sectorul civic"
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={6} />
            </div>
          </div>
        </div>
        <div className="col-span-11 col-start-14 pl-5 min-h-[70vh] bg-green-900 overflow-hidden rounded-2xl">
          Mapa
        </div>
      </section>
      <MiniSection />
    </>
  );
};

export default MainSection;
