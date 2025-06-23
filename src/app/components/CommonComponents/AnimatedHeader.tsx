"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";

interface TextProps {
  customStyles?: string;
  text: string;
}

const AnimatedHeader: React.FC<TextProps> = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const textAnimation: Variants = {
    hidden: {
      transform: "translateY(2rem)",
      opacity: 0,
    },
    visible: {
      transform: "translateY(0rem)",
      opacity: 100,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <motion.h2
      className={`${props.customStyles}`}
      ref={ref}
      variants={textAnimation}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      dangerouslySetInnerHTML={{ __html: props.text }}
    ></motion.h2>
  );
};

export default AnimatedHeader;
