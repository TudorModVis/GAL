import React from "react";
import { useTranslations } from "next-intl";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import ParalaxImage from "../CommonComponents/ParalaxImage";

const Breaker = () => {
  const tBreaker = useTranslations("index.Breaker");

  return (
    <section className="w-screen grid grid-cols-full relative px-8 my-40">
      <AnimatedHeader
        customStyles="col-span-9 text-5xl h-fit font-bold mb-8"
        text={tBreaker("motto")}
      />
      <div className="col-span-full h-[640px] relative">
        <ParalaxImage
          source="/breaker_image.png"
          altText={tBreaker("image_alt")}
        />
      </div>
    </section>
  );
};

export default Breaker;
