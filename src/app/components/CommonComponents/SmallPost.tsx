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
    <Link href={props.link} className="grid col-span-4">
      <div className="bg-sand-50 my-3 custom-shadow relative flex h-[500px] flex-col rounded-2xl overflow-hidden cursor-pointer group">
        <div className="h-1/2 relative">
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            {props.tags.map((tag, index) => {
              const randomBg = bgClasses[tag.length % bgClasses.length];
              return (
                <div
                  key={index}
                  className={`${randomBg} py-1 px-4 text-sand-50 rounded-sm text-sm`}
                >
                  {tag}
                </div>
              );
            })}
          </div>
          <Image
            alt={props.imageAlt}
            src={props.imageSrc}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="bg-sand-50 h-1/2 px-4 pb-4 pt-6 flex justify-between flex-col">
          <AnimatedHeader
            customStyles="font-bold text-xl leading-6"
            text={props.title}
          />
          <h4 className="group-hover:opacity-100 leading-4.5 opacity-0 transition-opacity duration-300">
            {props.description}
          </h4>
          <LinkWithArrow
            asBtn
            text="Accesează articol"
            href={props.link}
            arrowProps="group-hover:fill-sand-50 group-hover:rotate-0 -rotate-45 fill-forest-900"
            customStyle="flex w-full justify-between items-center [&>div:nth-child(1)]:py-2.5
                      [&>div:nth-child(1)]:px-4 [&>div]:group-hover:bg-forest-700 [&>div]:group-hover:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
    </Link>
  );
};
export default SmallPost;
