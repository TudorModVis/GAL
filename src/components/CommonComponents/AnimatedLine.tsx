"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";

interface LineProps {
  customStyles?: string;
}

const AnimatedLine: React.FC<LineProps> = ({ customStyles }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const line: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`w-full h-[1px] bg-stone-400 ${customStyles}`}
      variants={line}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    />
  );
};

export default AnimatedLine;
