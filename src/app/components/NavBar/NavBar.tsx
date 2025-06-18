"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import NavContent from "./NavContent";
import { AnimatePresence } from "motion/react";

interface NavBarProps {
  onlyFixed?: boolean;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const first = useRef(null);
  const second = useRef(null);
  const { scrollYProgress: scrollYProgressFirst } = useScroll({
    target: first,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: scrollYProgressSecond } = useScroll({
    target: second,
    offset: ["start start", "start start"],
  });
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNearEnd, setIsNearEnd] = useState(false);

  useMotionValueEvent(scrollYProgressFirst, "change", (position) => {
    setIsAtTop(position === 0);
  });

  useMotionValueEvent(scrollYProgressSecond, "change", (position) => {
    setIsNearEnd(position > 0);
  });

  return (
    <>
      <nav className="text-nowrap">
        <AnimatePresence mode="wait">
          {!isNearEnd && (props.onlyFixed || isAtTop) ? (
            <motion.div
              key="scrolled"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`grid text-forest-900 bg-sand-50 left-1/2 -translate-x-1/2 grid-cols-full top-0 items-center max-w-[1512px] justify-between fixed w-full m-auto z-20 px-8 py-4`}
            >
              <NavContent arrowColor="#11200B" />
              <div className="absolute bg-sand-50 w-[400%] -left-[100%] h-full -z-10"></div>
              <div className="bg-stone-400 h-[1px] absolute bottom-0 w-[400%] -left-[100%]"></div>
            </motion.div>
          ) : !isAtTop && !isNearEnd && !props.onlyFixed ? (
            <motion.div
              key="top"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-full items-center left-1/2 -translate-x-1/2 text-sand-50 absolute w-full m-auto z-20 px-8 py-4"
            >
              <NavContent arrowColor="#FFFEFD" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>

      <div ref={first} className="absolute top-[100vh] invisible"></div>
      <div ref={second} className="absolute top-[90%] invisible"></div>
    </>
  );
};

export default NavBar;
