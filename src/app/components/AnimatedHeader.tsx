"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextProps {
  customStyles?: string;
  text: string;
}

const AnimatedText: React.FC<TextProps> = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = props.text.split(/(\s+)/);

  return (
    <h4 className={props.customStyles} ref={ref}>
      {words.map((word, index) => {
        const isSpace = /^\s+$/.test(word);
        return (
          <motion.span
            key={index}
            initial={!isSpace ? { y: "2rem", opacity: 0 } : false}
            animate={!isSpace && isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word}
          </motion.span>
        );
      })}
    </h4>
  );
};

export default AnimatedText;
