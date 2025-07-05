import React from "react";
import { useTranslations } from "next-intl";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import ParalaxImage from "../CommonComponents/ParalaxImage";

const Breaker = () => {
  const tBreaker = useTranslations("index.Breaker");

  return (
    <section className="w-screen grid grid-cols-full relative sm:px-8 my-40">
      <AnimatedHeader
        customStyles="col-span-full sm:col-span-9 text-2xl sm:text-5xl h-fit font-bold sm:leading-13 leading-7 mb-6 sm:mb-8"
        text={tBreaker("motto")}
      />
      <div className="col-span-full h-[358px] sm:h-[640px] relative">
        <ParalaxImage
          source="/breaker_image.png"
          altText={tBreaker("image_alt")}
        />
      </div>
    </section>
  );
};

export default Breaker;
