import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import AnimatedText from "../CommonComponents/AnimatedText";

const Members = () => {
  const tMembers = useTranslations("aboutUs.members");

  return (
    <section className="w-screen min-h-[77vh] h-fit grid grid-cols-full grid-rows-[auto_1fr] relative text-forest-900 mb-16">
      <AnimatedHeader
        text={tMembers("title")}
        customStyles="font-bold text-5xl leading-13 col-span-full mt-24 mb-12"
      />
      <div className="col-span-3 h-full relative flex flex-col">
        <div className="w-full" style={{ height: "67%" }}>
          <Image
            alt="Victor Rudenco"
            src="/victor.png"
            width={300}
            height={400}
            className="rounded-2xl"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <AnimatedText
          text="Victor Rudenco"
          customStyles="font-bold mt-6 mb-4 text-xl"
        />
        <AnimatedText text={tMembers("president")} />
      </div>

      <div className="col-span-3 h-full relative flex flex-col">
        <div className="w-full" style={{ height: "88%" }}>
          <Image
            alt="Ana-Maria Ioniță"
            src="/ana.png"
            width={300}
            height={400}
            className="rounded-2xl"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <AnimatedText
          text="Ana-Maria Ioniță"
          customStyles="font-bold mt-6 mb-4 text-xl"
        />
        <AnimatedText text={tMembers("director")} />
      </div>
      <div className="col-span-3 h-full relative flex flex-col">
        <div className="w-full" style={{ height: "67%" }}>
          <Image
            alt="Maxim"
            src="/maxim.png"
            width={300}
            height={400}
            className="rounded-2xl"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <AnimatedText
          text="Maxim Furtună"
          customStyles="font-bold mt-6 mb-4 text-xl"
        />
        <AnimatedText text={tMembers("manager")} />
      </div>
      <div className="col-span-3 h-full relative flex flex-col">
        <div className="w-full" style={{ height: "88%" }}>
          <Image
            alt="Dumitru"
            src="/dumitru.png"
            width={300}
            height={400}
            className="rounded-2xl"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
        <AnimatedText
          text="Dumitru Marguleț"
          customStyles="font-bold mt-6 mb-4 text-xl"
        />
        <AnimatedText text={tMembers("accountant")} />
      </div>
    </section>
  );
};

export default Members;
