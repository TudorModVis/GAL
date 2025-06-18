"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../CommonComponents/Arrow";
import Image from "next/image";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";

const completedProjectsData = [
  {
    id: 1,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    date: "24.06.2024 - 01.03.2025",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională de...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    date: "12.02.2025",
    title: "2. Proiect Completat: Inițiativă Educațională Regională",
    description:
      "Acest proiect a avut ca scop îmbunătățirea accesului la educație de calitate pentru tinerii din comunitate.",
  },
  {
    id: 3,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    date: "24.06.2024 - 01.03.2025",
    title: "3. Proiect Completat: Program de Sustenabilitate Agricolă",
    description:
      "Implementarea de practici agricole durabile pentru a sprijini fermierii locali și a proteja mediul.",
  },
  {
    id: 4,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    date: "12.02.2025",
    title: "4. Proiect Completat: Digitalizarea Serviciilor Publice",
    description:
      "Un proiect de anvergură care a adus serviciile administrative mai aproape de cetățeni prin tehnologie.",
  },
];

const CompletedProjects = () => {
  const tCompletedProjects = useTranslations("index.CompletedProjects");
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsVisible = 2;

  const maxIndex = completedProjectsData.length - itemsVisible;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  return (
    <section className="w-screen min-h-screen relative bg-sand-50 flex items-center">
      <div className="grid-cols-full grid py-24 relative w-full">
        <div className="col-span-full flex justify-between items-center mb-12">
          <AnimatedHeader
            customStyles="text-5xl font-bold text-forest-900"
            text={tCompletedProjects("completed_projects_header")}
          />
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <Arrow arrowCustomStyle="-rotate-180 fill-sand-50" />
            </button>

            <button
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <Arrow arrowCustomStyle="fill-sand-50" />
            </button>
          </div>
        </div>

        <div className="col-span-full overflow-hidden">
          <motion.div
            className="flex"
            style={{ columnGap: "24px" }}
            animate={{ x: `-${currentIndex * (102 / itemsVisible)}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
          >
            {completedProjectsData.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 flex justify-center items-center"
                style={{
                  width: "calc(50% - 12px)",
                  height: "605px",
                }}
              >
                <div className="bg-stone-50 custom-shadow w-[98%] h-[98%] relative flex flex-col rounded-2xl overflow-hidden cursor-pointer">
                  <div className="h-1/2 relative">
                    <Image
                      alt={project.title}
                      src={project.image}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="50vw"
                    />
                  </div>
                  <div className="h-1/2 px-6 py-8 flex flex-col justify-between group text-forest-900">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {project.tags.map((tag) => (
                          <div
                            key={tag}
                            className={`bg-forest-700 text-sand-50 text-xs font-semibold py-1 px-3 rounded-sm ${
                              [
                                "Antreprenorial",
                                "Public",
                                "Logistică",
                              ].includes(tag)
                                ? "bg-forest-800"
                                : "bg-forest-500"
                            }`}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                      <span className="text-forest-900 text-xs font-bold">
                        {project.date}
                      </span>
                    </div>
                    <AnimatedHeader
                      customStyles="font-bold text-xl leading-6"
                      text={project.title}
                    />
                    <h4 className="leading-4.5">{project.description}</h4>
                    <LinkWithArrow
                      text="Accesează articol"
                      href="/"
                      arrowProps="group-hover/link:fill-sand-50 group-hover/link:rotate-0 -rotate-45 fill-forest-900"
                      customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5
                       [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="col-span-full mt-12 flex flex-col items-center">
          <div className="bg-stone-300 h-[2px] w-full">
            <motion.div
              className="bg-forest-900 h-full"
              animate={{
                width:
                  maxIndex > 0 ? `${(currentIndex / maxIndex) * 100}%` : "100%",
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            />
          </div>
          <LinkWithArrow
            text="Vezi mai multe noutăți"
            href="/"
            arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
            customStyle="flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                                 [&>div:nth-child(1)]:px-4 [&>div]:text-sand-50 [&>div]:bg-forest-700 gap [&>div]:group-hover/link:bg-forest-800 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
