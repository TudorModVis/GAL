"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedHeader from "../AnimatedHeader";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Arrow from "../Arrow";
import LinkWithArrow from "../LinkWithArrow";

const newsData = [
  {
    id: 1,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 3,
    image: "/donation_image.png",
    tags: ["Logistică", "Noutate"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 4,
    image: "/breaker_image.png",
    tags: ["Antreprenorial", "Noutate"],
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 5,
    image: "/donation_image.png",
    tags: ["Noutate", "Public"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
];

const LastNews = () => {
  const tLastNews = useTranslations("index.LastNews");
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = newsData.length - 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const progressPercentage =
    maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;

  return (
    <section className="w-screen h-[calc(100vh+3.75rem)] relative bg-forest-600 flex items-center">
      <div className="grid-cols-full grid py-24 relative w-full">
        <div className="col-span-full flex justify-between items-center mb-12">
          <AnimatedHeader
            customStyles="text-5xl font-bold text-sand-50"
            text={tLastNews("last_news_header")}
          />
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <Arrow arrowCustomStyle="-rotate-180 fill-forest-900" />
            </button>
            <button
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <Arrow arrowCustomStyle="fill-forest-900" />
            </button>
          </div>
        </div>

        <div className="col-span-full px-2 overflow-hidden">
          <motion.div
            className="flex"
            style={{ columnGap: "24px" }}
            animate={{ x: `-${currentIndex * (102 / 3)}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
          >
            {newsData.map((news) => (
              <div
                key={news.id}
                className="bg-sand-50 my-3 custom-shadow relative flex h-[500px] flex-col rounded-2xl overflow-hidden cursor-pointer"
                style={{ flex: "0 0 calc(100% / 3 - 16px)" }}
              >
                <div className="h-1/2 relative">
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    {news.tags.map((tag) => (
                      <div
                        key={tag}
                        className={`${
                          ["Antreprenorial", "Public", "Logistică"].includes(
                            tag
                          )
                            ? "bg-forest-800"
                            : "bg-forest-500"
                        } py-1 px-4 text-sand-50 rounded-sm text-sm`}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <Image
                    alt={news.title}
                    src={news.image}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="bg-sand-50 h-1/2 px-4 pb-4 pt-6 flex justify-between flex-col group">
                  <AnimatedHeader
                    customStyles="font-bold text-xl leading-6"
                    text={news.title}
                  />
                  <h4 className="group-hover:opacity-100 leading-4.5 opacity-0 transition-opacity duration-300">
                    {news.description}
                  </h4>
                  <LinkWithArrow
                    text={tLastNews("access_article")}
                    href="/"
                    arrowProps="group-hover/link:fill-sand-50 group-hover/link:rotate-0 -rotate-45 fill-forest-900"
                    customStyle="flex w-full justify-between items-center [&>div:nth-child(1)]:py-2.5
                      [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="col-span-full mt-12 flex flex-col items-center">
          <div className="bg-stone-500/50 h-[2px] w-full">
            <motion.div
              className="bg-white h-full"
              animate={{
                width: `${progressPercentage}%`,
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            />
          </div>
          <LinkWithArrow
            text={tLastNews("see_more_news")}
            href="/"
            arrowProps="group-hover/link:rotate-0 -rotate-45 fill-forest-900"
            customStyle="flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                          [&>div:nth-child(1)]:px-4 [&>div]:bg-sand-50 gap [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
    </section>
  );
};

export default LastNews;
