"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedHeader from "../AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../Arrow";
import Image from "next/image";
import LinkWithArrow from "../LinkWithArrow";

const newsData = [
  {
    id: 1,
    image: "/donation_image.png",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    title:
      "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 3,
    image: "/donation_image.png",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 4,
    image: "/breaker_image.png",
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description:
      "Aceasta este descrierea pentru a patra știre, asigurând o buclă lină.",
  },
  {
    id: 5,
    image: "/donation_image.png",
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Descrierea celei de-a cincea știri pentru a demonstra funcționalitatea completă.",
  },
];

const LastNews = () => {
  const tLastNews = useTranslations("index.LastNews");
  const [currentIndex, setCurrentIndex] = useState(1);
  const maxIndex = newsData.length - 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  return (
    <section className="w-screen min-h-screen relative bg-forest-600 flex items-center">
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
              <Arrow isCircle={false} customStyle="-rotate-135" />
            </button>
            <button
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <Arrow isCircle={false} customStyle="rotate-45" />
            </button>
          </div>
        </div>

        <div className="col-span-full px-2 overflow-hidden">
          <motion.div
            className="flex"
            style={{ columnGap: "24px" }}
            animate={{ x: `-${currentIndex * (100 / 3)}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
          >
            {newsData.map((news) => (
              <div
                key={news.id}
                className="bg-sand-50 my-3 custom-shadow relative flex h-[500px] flex-col rounded-2xl overflow-hidden cursor-pointer"
                style={{ flex: "0 0 calc(100% / 3 - 16px)" }}
              >
                <div className="h-1/2 relative">
                  <Image
                    alt={news.title}
                    src={news.image}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="bg-sand-50 h-1/2 px-4 py-6 flex justify-between flex-col group">
                  <AnimatedHeader
                    customStyles="font-bold text-2xl"
                    text={news.title}
                  />
                  <h4 className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                    {news.description}
                  </h4>
                  <LinkWithArrow
                    backgroundColor="group-hover:bg-forest-700"
                    text="Accesează articol"
                    href="/"
                    customStyle="text-forest-900 group-hover:text-sand-50"
                    style="split"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="col-span-full mt-12">
          <div className="bg-stone-500/50 h-[2px] w-full">
            <motion.div
              className="bg-white h-full"
              animate={{
                width: `${(currentIndex / maxIndex) * 100}%`,
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastNews;
