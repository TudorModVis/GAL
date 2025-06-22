import Link from "next/link";
import React from "react";
import Arrow from "./Arrow";

interface ArrowProps {
  asBtn?: boolean;
  href: string;
  text: string;
  customStyle?: string;
  arrowProps?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}

const LinkWithArrow: React.FC<ArrowProps> = (props) => {
  return !props.asBtn ? (
    <Link
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      href={props.href}
      className={`${props.customStyle} group/link text-forest-900`}
    >
      <div className="transition text-nowrap">{props.text}</div>
      <div className="flex justify-center items-center transition">
        <Arrow arrowCustomStyle={props.arrowProps} />
      </div>
    </Link>
  ) : (
    <button className={`${props.customStyle} group/link text-forest-900 cursor-pointer`}>
      <div className="transition text-nowrap">{props.text}</div>
      <div className="flex justify-center items-center transition">
        <Arrow arrowCustomStyle={props.arrowProps} />
      </div>
    </button>
  );
};

export default LinkWithArrow;
