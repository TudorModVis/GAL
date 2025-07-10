"use client";

import React from "react";
import Moldova from "./Moldova";
import { useTranslations } from "next-intl";
import AnimatedCounter from "../CommonComponents/AnimatedCounter";
import AnimatedLine from "../CommonComponents/AnimatedLine";
import AnimatedText from "../CommonComponents/AnimatedText";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";

const AboutUs = () => {
  const tAboutUs = useTranslations("index.AboutUs");

  return (
    <section
      id="aboutUs"
      className="w-screen h-fit grid grid-cols-full relative sm:px-8 sm:my-24"
    >
      <div className="order-1 col-span-full sm:col-span-6 leading-4.5 mb-12 sm:mb-0 sm:mt-0 mt-20">
        <AnimatedText
          customStyles="font-bold"
          text={tAboutUs("impact_title")}
        />
        <AnimatedText
          customStyles="mt-2 mb-9"
          text={tAboutUs("impact_description")}
        />
        <LinkWithArrow
          text={tAboutUs("button_learn_more")}
          href="/aboutUs"
          arrowProps="group-hover/link:fill-sand-50 group-hover/link:rotate-0 -rotate-45 fill-sand-50"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5
                     [&>div:nth-child(1)]:px-4 [&>div]:bg-forest-700 [&>div]:group-hover/link:bg-forest-800 text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
      <div className="order-3 sm:order-2 col-span-full sm:col-span-9 mt-12 sm:mt-72">
        <AnimatedHeader
          customStyles="font-bold text-2xl sm:text-5xl sm:leading-13 leading-7"
          text={tAboutUs("main_headline")}
        />
      </div>
      <div className="order-2 sm:order-3 sm:col-start-9 sm:col-span-4 col-span-full sm:absolute">
        <Moldova />
      </div>
      <div className="order-4 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-6 sm:h-40 h-[106px]">
        <AnimatedLine />
        <div className="h-full flex flex-col justify-between">
          <AnimatedText
            customStyles="leading-4.5 mt-2"
            text={tAboutUs("stat_projects_success")}
          />
          <div className="flex gap">
            <AnimatedCounter from={0} to={32} />
            <span className="sm:leading-13 leading-7 font-bold sm:text-5xl text-2xl">+</span>
          </div>
        </div>
      </div>
      <div className="order-5 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-4 sm:h-40 h-[106px]">
        <AnimatedLine />
        <div className="h-full flex flex-col justify-between">
          <AnimatedText
            customStyles="leading-4.5 mt-2"
            text={tAboutUs("stat_years_activity")}
          />
          <div className="flex gap">
            <AnimatedCounter from={0} to={2.5} />
          </div>
        </div>
      </div>
      <div className="order-6 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-4 sm:h-40 h-[106px]">
        <AnimatedLine />
        <div className="h-full flex flex-col justify-between">
          <AnimatedText
            customStyles="leading-4.5 mt-2"
            text={tAboutUs("stat_total_population")}
          />
          <div className="flex gap">
            <AnimatedCounter from={0} to={21648} />
            <span className="sm:leading-13 leading-7 font-bold text-2xl sm:text-5xl">+</span>
          </div>
        </div>
      </div>
      <div className="order-7 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-4 sm:h-40 h-[106px] sm:mb-0 mb-20">
        <AnimatedLine />
        <div className="h-full flex flex-col justify-between">
          <AnimatedText
            customStyles="leading-4.5 mt-2"
            text={tAboutUs("stat_total_members")}
          />
          <AnimatedCounter from={0} to={29} />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
