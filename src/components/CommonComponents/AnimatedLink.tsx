"use client"

import { motion } from "framer-motion";
import React from "react";

interface AnimatedLinkProp {
  customStyles?: string;
  text: string;
}

const AnimatedLink: React.FC<AnimatedLinkProp> = (props) => {
  const containerVariants = {
    initial: {
      y: "0%",
    },
    hover: {
      y: "-50%",
    },
  };

  const transition = {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.75,
  };

  return (
    <div style={{ height: "1.2em", lineHeight: "1.2em" }}>
      <motion.div
        className={`relative inline-block overflow-hidden cursor-pointer ${props.customStyles}`}
        style={{ height: "1.2em", lineHeight: "1.2em" }}
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className="flex flex-col"
          variants={containerVariants}
          transition={transition}
        >
          <p className="m-0">{props.text}</p>
          <p className="m-0">{props.text}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedLink;
