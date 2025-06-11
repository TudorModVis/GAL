import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Breaker = () => {
  const tBreaker = useTranslations("index.Breaker");

  return (
    <section className="w-screen grid grid-cols-full relative px-8 my-40">
      <h2 className="col-span-9 text-5xl h-fit font-bold mb-8">
        {tBreaker("motto")}
      </h2>
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
