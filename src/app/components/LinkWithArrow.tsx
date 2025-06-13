import React from "react";
import Link from "next/link";
import Arrow from "./Arrow";

interface LinkWithArrowProps {
  backgroundColor?: string;
  insideColor?: string;
  text?: string;
  fill?: string;
  circle?: string;
  href: string;
  style?: "default" | "split";
  customStyle?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}

const LinkWithArrow: React.FC<LinkWithArrowProps> = (props) => {
  const isAcceseazaArticol = props.text === "Accesează articol";
  return (
    <Link
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={!isAcceseazaArticol ? { color: props.insideColor } : undefined}
      className={`group flex ${
        props.style === "split" ? "w-full justify-between" : "w-fit gap-1"
      } leading-normal ${props.customStyle}`}
      href={props.href}
    >
      <div
        className={`px-4 py-2.5 ${props.backgroundColor} rounded-full ${
          isAcceseazaArticol ? "text-forest-900 group-hover:text-sand-50" : ""
        }`}
      >
        {props.text}
      </div>
      <div
        className={`group-hover:rotate-45 transition ease-in
        ${props.circle ? "p-2" : "p-4"}  
        ${props.circle ? props.circle : props.backgroundColor}
        rounded-full self-center ${
          isAcceseazaArticol ? "text-forest-900 group-hover:text-sand-50" : ""
        }`}
      >
        <Arrow
          fill={
            isAcceseazaArticol
              ? undefined
              : props.circle
              ? "#FFFEFD"
              : props.insideColor
          }
          isCircle={!!props.circle}
        />
      </div>
    </Link>
  );
};

export default LinkWithArrow;
