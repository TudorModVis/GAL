"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedHeader from "../AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../Arrow";
import Image from "next/image";
import LinkWithArrow from "../LinkWithArrow";

const completedProjectsData = [
  {
    id: 1,
    image: "/donation_image.png",
    title: "1. Proiect Completat: Modernizarea Infrastructurii Locale",
    description:
      "Descrierea detaliată pentru primul proiect finalizat, subliniind impactul și rezultatele obținute.",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    title: "2. Proiect Completat: Inițiativă Educațională Regională",
    description:
      "Acest proiect a avut ca scop îmbunătățirea accesului la educație de calitate pentru tinerii din comunitate.",
  },
  {
    id: 3,
    image: "/donation_image.png",
    title: "3. Proiect Completat: Program de Sustenabilitate Agricolă",
    description:
      "Implementarea de practici agricole durabile pentru a sprijini fermierii locali și a proteja mediul.",
  },
  {
    id: 4,
    image: "/breaker_image.png",
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
              <Arrow isCircle={false} customStyle="-rotate-135 fill-sand-50" />
            </button>

            <button
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <Arrow isCircle={false} customStyle="rotate-45 fill-sand-50" />
            </button>
          </div>
        </div>

        <div className="col-span-full overflow-hidden">
          <motion.div
            className="flex"
            style={{ columnGap: "24px" }}
            animate={{ x: `-${currentIndex * (100 / itemsVisible)}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
          >
            {completedProjectsData.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0"
                style={{
                  width: "calc(50% - 12px)",
                  height: "605px",
                }}
              >
                <div className="bg-sand-50 w-full h-full relative flex flex-col rounded-2xl overflow-hidden cursor-pointer">
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
                    <AnimatedHeader
                      customStyles="font-bold text-2xl"
                      text={project.title}
                    />
                    <h4>{project.description}</h4>
                    <LinkWithArrow
                      backgroundColor="bg-forest-700 group-hover:bg-sand-50"
                      text="Accesează articol"
                      href="/"
                      customStyle="[&>div]:text-sand-50 [&>div]:transition [&>div]:group-hover:text-forest-900"
                      style="split"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="col-span-full mt-12">
          <div className="bg-stone-300 h-[2px] w-full">
            <motion.div
              className="bg-forest-900 h-full"
              animate={{
                width:
                  maxIndex > 0 ? `${(currentIndex / maxIndex) * 100}%` : "0%",
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
