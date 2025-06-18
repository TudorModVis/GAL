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
      className="w-screen h-fit grid grid-cols-full relative px-8 my-24"
    >
      <div className="col-span-6 leading-4.5">
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
          href="/"
          arrowProps="group-hover/link:fill-sand-50 group-hover/link:rotate-0 -rotate-45 fill-sand-50"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5
                     [&>div:nth-child(1)]:px-4 [&>div]:bg-forest-700 [&>div]:group-hover/link:bg-forest-800 text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
      <div className="col-span-9 mt-72">
        <AnimatedHeader
          customStyles="font-bold text-5xl leading-13"
          text={tAboutUs("main_headline")}
        />
      </div>
      <div className="col-start-9 col-span-4 absolute">
        <Moldova />
      </div>
      <div className="flex flex-col col-span-3 row-start-3 mt-24 h-40">
        <AnimatedLine />
        <div className="h-full flex flex-col justify-between">
          <AnimatedText
            customStyles="leading-4.5 mt-2"
            text={tAboutUs("stat_projects_success")}
          />
          <div className="flex gap">
            <AnimatedCounter from={0} to={32} />
            <span className="leading-14 font-bold text-5xl">+</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-3 row-start-3 mt-24 h-40">
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
      <div className="flex flex-col col-span-3 row-start-3 mt-24 h-40">
        <AnimatedLine />
        <div className="h-full flex flex-col justify-between">
          <AnimatedText
            customStyles="leading-4.5 mt-2"
            text={tAboutUs("stat_total_population")}
          />
          <div className="flex gap">
            <AnimatedCounter from={0} to={21648} />
            <span className="leading-14 font-bold text-5xl">+</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-3 row-start-3 mt-24 h-40">
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
