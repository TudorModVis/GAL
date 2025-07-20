import React from "react";
import AnimatedLine from "../CommonComponents/AnimatedLine";
import AnimatedText from "../CommonComponents/AnimatedText";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import { useTranslations } from "next-intl";

const MiniSection = () => {
  const tMiniSection = useTranslations("aboutUs.miniSection");

  return (
    <div className="w-full h-fit mt-40 mb-40 grid grid-cols-full">
      <AnimatedLine customStyles="col-span-full mb-2" />
      <AnimatedText
        text={tMiniSection("title")}
        customStyles="font-bold leading-4.5 sm:col-span-3 col-span-full"
      />
      <div className="sm:col-span-4 col-span-full sm:mt-0 mt-12">
        <AnimatedText
          text={tMiniSection("description1")}
          customStyles="leading-4.5 sm:col-span-4 col-span-full sm:mb-6 mb-4"
        />
        <LinkWithArrow
          text={tMiniSection("management_button")}
          href="/administration"
          arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50 origin-center"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
      <div className="sm:col-span-4 col-span-full sm:mt-0 mt-12">
        <AnimatedText
          text={tMiniSection("description2")}
          customStyles="leading-4.5 sm:col-span-4 col-span-full sm:mb-6 mb-4"
        />
        <LinkWithArrow
          text={tMiniSection("documents_button")}
          href="/documents"
          arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3 sm:mb-0 mb-20"
        />
      </div>
    </div>
  );
};

export default MiniSection;
