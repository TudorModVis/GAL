import Link from "next/link";
import React from "react";
import Arrow from "./Arrow";

interface ArrowProps {
  href: string;
  text: string;
  customStyle?: string;
  arrowProps?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}

const LinkWithArrow: React.FC<ArrowProps> = (props) => {
  return (
    <Link
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      href={props.href}
      className={`${props.customStyle} group/link text-forest-900`}
    >
      <div className="transition">{props.text}</div>
      <div className="flex justify-center items-center transition">
        <Arrow arrowCustomStyle={props.arrowProps} />
      </div>
    </Link>
  );
};

export default LinkWithArrow;
