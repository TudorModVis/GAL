import React from "react";
import Image from "next/image";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import { useTranslations } from "next-intl";
import AnimatedText from "../CommonComponents/AnimatedText";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";

const Donation = () => {
  const tDonation = useTranslations("index.Donation");

  return (
    <section className="w-screen h-fit grid grid-cols-donation relative px-8 mt-24 pb-24">
      <div className="col-span-11 grid grid-cols-11 text-sand-50 bg-forest-800 p-8 rounded-l-2xl">
        <AnimatedHeader
          customStyles="col-span-9 text-5xl h-fit font-bold mb-8"
          text={tDonation("cta_title")}
        />
        <AnimatedText
          customStyles="col-span-10 row-start-2 leading-4.5 mt-6"
          text={tDonation("territorial_population_info")}
        />
        <div className="col-span-10 row-start-3 mt-32">
          <LinkWithArrow
            text={tDonation("contact_button_text")}
            href="/"
            arrowProps="group-hover/link:rotate-0 -rotate-45 fill-forest-900"
            customStyle="flex gap-1 mx-auto w-full items-center [&>div:nth-child(1)]:py-2.5
                         [&>div:nth-child(1)]:px-4 [&>div]:text-forest-900 [&>div]:bg-sand-50 [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
      <div className="col-span-13 bg-black relative rounded-r-2xl ">
        <Image
          src="/donation_image.png"
          alt="Donation Image"
          className="object-cover rounded-r-2xl"
          fill={true}
        />
      </div>
    </section>
  );
};

export default Donation;
