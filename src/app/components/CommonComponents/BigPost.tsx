import React from "react";
import Image from "next/image";
import LinkWithArrow from "./LinkWithArrow";
import AnimatedHeader from "./AnimatedHeader";
import Link from "next/link";

interface SmallPostProps {
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  link: string;
  date?: string;
}

const bgClasses = ["bg-forest-800", "bg-forest-700", "bg-forest-600"];

const SmallPost: React.FC<SmallPostProps> = (props) => {
  return (
    <Link
      href={props.link}
      className="bg-stone-50 group col-span-6 custom-shadow w-full h-[605px] relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="h-1/2 relative">
        <Image
          alt={props.imageAlt}
          src={props.imageSrc}
          fill
          style={{ objectFit: "cover" }}
          sizes="50vw"
        />
      </div>
      <div className="h-1/2 px-6 py-8 flex flex-col justify-between group text-forest-900">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            {props.tags.map((tag) => {
              const randomBg = bgClasses[tag.length % bgClasses.length];
              return (
                <div
                  key={tag}
                  className={`${randomBg} text-sand-50 text-xs font-semibold py-1 px-3 rounded-sm`}
                >
                  {tag}
                </div>
              );
            })}
          </div>
          <span className="text-forest-900 text-xs font-bold">
            {props.date}
          </span>
        </div>
        <AnimatedHeader
          customStyles="font-bold text-xl leading-6"
          text={props.title}
        />
        <h4 className="leading-4.5">{props.description}</h4>
        <LinkWithArrow
          asBtn
          text="Accesează articol"
          href={props.link}
          arrowProps="group-hover:fill-sand-50 group-hover:rotate-0 -rotate-45 fill-forest-900"
          customStyle="flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5
                       [&>div:nth-child(1)]:px-4 [&>div]:group-hover:bg-forest-700 [&>div]:group-hover:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
        />
      </div>
    </Link>
  );
};

export default SmallPost;
