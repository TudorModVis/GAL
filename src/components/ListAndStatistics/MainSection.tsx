"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import AnimatedText from "../CommonComponents/AnimatedText";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import AnimatedLine from "../CommonComponents/AnimatedLine";
import AnimatedCounter from "../CommonComponents/AnimatedCounter";
import MiniSection from "./MiniSection";
import MapPlaceholder from "./MapPlaceholder";
import { useTranslations } from "next-intl";

const MainSection = () => {
  const MapWithNoSSR = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <MapPlaceholder />,
        ssr: false,
      }),
    []
  );

  const tListAndStatistics = useTranslations("aboutUs.listAndStatistics");
  return (
    <>
      <section className="grid w-screen h-fit gap-[24px] grid-cols-donation mt-24">
        <div className="col-span-12 flex flex-col justify-between">
          <div className="w-full">
            <AnimatedHeader
              text={tListAndStatistics("title")}
              customStyles="leading-13 text-5xl font-bold mb-12"
            />
            <AnimatedText
              text={tListAndStatistics("description")}
              customStyles="leading-4.5 mb-6"
            />

            <LinkWithArrow
              text={tListAndStatistics("resource_map_button")}
              href="/"
              arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
              customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
            />
          </div>
          <div className="w-full grid grid-cols-6 gap-[24px]">
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text={tListAndStatistics("total_members")}
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={29} />
            </div>
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text={tListAndStatistics("entrepreneurial_sector_members")}
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={12} />
            </div>
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text={tListAndStatistics("public_sector_members")}
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={11} />
            </div>
            <div className="col-span-3">
              <AnimatedLine />
              <AnimatedText
                text={tListAndStatistics("civic_sector_members")}
                customStyles="mt-2 mb-10"
              />
              <AnimatedCounter from={0} to={6} />
            </div>
          </div>
        </div>
        <div className="col-span-11 col-start-14 max-h-[70vh] bg-green-900 overflow-hidden rounded-2xl">
          <MapWithNoSSR />
        </div>
      </section>
      <MiniSection />
    </>
  );
};

export default MainSection;
