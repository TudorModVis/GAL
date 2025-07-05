import React from "react";
import AnimatedHeader from "./AnimatedHeader";
import AnimatedText from "./AnimatedText";
import AnimatedLine from "./AnimatedLine";
import Arrow from "./Arrow";
import ParalaxImage from "./ParalaxImage";

interface InfoSectionProps {
  tags: string[];
  headerText: string;
  lastActualization?: string;
  location: string[];
  imageSrc: string;
  imageAlt: string;
}

const bgClasses = ["bg-forest-800", "bg-forest-700", "bg-forest-600"];

const InfoSection: React.FC<InfoSectionProps> = (props) => {
  return (
    <section className="w-screen h-fit grid grid-cols-full relative text-forest-900 align-content-start pt-24">
      <div className="col-span-9 flex flex-col mt-24">
        <div className="flex gap-2 text-sand-50 items-center">
          {props.tags.map((tag, index) => {
            const randomBg =
              bgClasses[Math.floor(Math.random() * bgClasses.length)];
            return (
              <span
                key={index}
                className={`${randomBg} px-3 py-1 rounded-sm mr-2 mb-2 text-nowrap`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <AnimatedHeader
          text={props.headerText}
          customStyles="leading-13 text-5xl font-bold my-4"
        />
        {props.lastActualization && (
          <AnimatedText
            text={"ultima actualizare " + props.lastActualization}
            customStyles="leading-4.5 mb-6 font-bold"
          />
        )}
      </div>
      <AnimatedLine customStyles="col-span-full mt-24 mb-2" />
      <div className="flex gap-1 items-center col-span-full">
        {props.location.map((loc, index) => (
          <React.Fragment key={index}>
            <h2
              className={`${
                index === props.location.length - 1
                  ? "text-forest-900"
                  : "text-stone-600"
              }`}
            >
              {loc}
            </h2>
            {index < props.location.length - 1 && (
              <Arrow arrowCustomStyle="fill-stone-600 scale-75" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="w-[1448px] h-[64vh] overflow-hidden mt-6 rounded-2xl mb-40 col-span-full">
        <ParalaxImage altText={props.imageAlt} source={props.imageSrc} />
      </div>
    </section>
  );
};

export default InfoSection;
