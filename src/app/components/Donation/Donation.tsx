import React from "react";
import Image from "next/image";
import LinkWithArrow from "../LinkWithArrow";
import { useTranslations } from "next-intl";

const Donation = () => {
  const tDonation = useTranslations("index.Donation");

  return (
    <section className="w-screen h-fit grid grid-cols-donation relative px-8 mt-24 pb-24">
      <div className="col-span-11 grid grid-cols-11 text-sand-50 bg-forest-800 p-8 rounded-l-2xl">
        <h3 className="col-span-10 text-5xl font-bold leading-13">
          {tDonation("cta_title")}
        </h3>
        <h4 className="col-span-10 row-start-2 leading-4.5 mt-6">
          {tDonation("territorial_population_info")}
        </h4>
        <div className="col-span-10 row-start-3 mt-32">
          <LinkWithArrow
            backgroundColor="bg-sand-50"
            insideColor="#11200B"
            text={tDonation("contact_button_text")}
            href="/"
            style="default"
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
