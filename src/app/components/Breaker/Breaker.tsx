import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimatedHeader from "../AnimatedHeader";

const Breaker = () => {
  const tBreaker = useTranslations("index.Breaker");

  return (
    <section className="w-screen grid grid-cols-full relative px-8 my-40">
      <AnimatedHeader
        customStyles="col-span-9 text-5xl h-fit font-bold mb-8"
        text={tBreaker("motto")}
      />
      <div className="col-span-full h-[640px] relative">
        <Image
          src="/breaker_image.png"
          fill={true}
          alt={tBreaker("image_alt")}
          className="rounded-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default Breaker;
