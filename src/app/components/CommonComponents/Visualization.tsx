"use client";

import React, { useState } from "react";
import AnimatedText from "./AnimatedText";
import AnimatedLine from "./AnimatedLine";
import ColumnIcon from "./ColumnIcon";
import GridIcon from "./GridIcon";
import SmallPost from "./SmallPost";
import BigPost from "./BigPost";

interface VisualisationProps {
  header: string;
  description: string;
}

const content = [
  {
    tags: ["Antreprenorial", "Noutate"],
    imageSrc: "/breaker_image.png",
    imageAlt: "test",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
    link: "/",
    date: "24.06.2024 - 01.03.2025",
  },
  {
    tags: ["Noutate", "Public"],
    imageSrc: "/breaker_image.png",
    imageAlt: "test",
    title: "Economia Circulară în industria Textilelor și Îmbrăcămintei",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
    link: "/",
    date: "12.02.2025",
  },
  {
    tags: ["Logistică", "Noutate"],
    imageSrc: "/breaker_image.png",
    imageAlt: "test",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
    link: "/",
    date: "24.06.2024 - 01.03.2025",
  },
  {
    tags: ["Noutate", "Public"],
    imageSrc: "/breaker_image.png",
    imageAlt: "test",
    title: "Economia Circulară în industria Textilelor și Îmbrăcămintei",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
    link: "/",
    date: "12.02.2025",
  },
  {
    tags: ["Logistică", "Noutate"],
    imageSrc: "/breaker_image.png",
    imageAlt: "test",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
    link: "/",
    date: "24.06.2024 - 01.03.2025",
  },
  {
    tags: ["Noutate", "Public"],
    imageSrc: "/breaker_image.png",
    imageAlt: "test",
    title: "Economia Circulară în industria Textilelor și Îmbrăcămintei",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
    link: "/",
    date: "12.02.2025",
  },
];

const Visualization: React.FC<VisualisationProps> = (props) => {
  const [visualisationType, setVisualisationType] = useState(true);
  // În mod implicit va fi grid, adică true = grid
  return (
    <section className="w-screen h-fit grid grid-cols-full relative text-forest-900 mt-40">
      <AnimatedLine customStyles="col-span-full" />
      <AnimatedText text={props.header} customStyles="col-span-2 font-bold" />
      <AnimatedText
        text={props.description}
        customStyles="col-span-4 col-start-4"
      />
      <div className="col-span-2 col-start-11 flex flex-col mb-24">
        <AnimatedText
          text="Tip de vizualizare"
          customStyles="text-right font-bold"
        />
        <div className="flex justify-end gap-1 mt-2">
          <button
            onClick={() => setVisualisationType(false)}
            className={`size-10 transition duration-300 small-custom-shadow relative ${
              visualisationType ? "bg-stone-50" : "bg-forest-800"
            } rounded-full cursor-pointer flex justify-center items-center`}
          >
            <ColumnIcon
              color={visualisationType ? "fill-forest-800" : "fill-stone-50"}
            />
          </button>
          <button
            onClick={() => setVisualisationType(true)}
            className={`size-10 transition duration-300 small-custom-shadow relative ${
              visualisationType ? "bg-forest-800" : "bg-stone-50"
            } rounded-full cursor-pointer flex justify-center items-center`}
          >
            <GridIcon
              color={visualisationType ? "fill-stone-50" : "fill-forest-800"}
            />
          </button>
        </div>
      </div>
      <div className="col-span-full grid grid-cols-12 gap-6">
        {content.map((item, index) =>
          !visualisationType ? (
            <BigPost
              key={index}
              tags={item.tags}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
              link={item.link}
              date={item.date}
            />
          ) : (
            <SmallPost
              key={index}
              tags={item.tags}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
              link={item.link}
              date={item.date}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Visualization;
