"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParalaxImageProps {
  source: string;
  altText: string;
}

const ParalaxImage: React.FC<ParalaxImageProps> = ({ source, altText }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden rounded-2xl"
    >
      <motion.img
        src={source}
        alt={altText}
        className="absolute top-0 left-0 w-full full object-cover"
        style={{ y }}
      />
    </div>
  );
};

export default ParalaxImage;
