"use client";
import React, { useEffect } from "react";
import { motion, useCycle, Variants } from "framer-motion";

interface HeroProps {
  heroTitle1: string;
  heroTitle2: string;
  videoSource: string;
}

const topLine: Variants = {
  show: { y: 0, opacity: 1 },
  hidden: { y: "-115%", opacity: 0 },
};

const bottomLine: Variants = {
  show: { y: 0, opacity: 1 },
  hidden: { y: "115%", opacity: 0 },
};

const letterTransition = (i: number) => ({
  delay: 0.04 * i,
  duration: 0.8,
  ease: "easeInOut",
});

const INTERVAL = 5000;

const scrollDot: Variants = {
  animate: {
    y: [0, -24, -24],
    scaleY: [1, 3, 1, 1],
    opacity: [1, 1, 1, 0],
    transition: {
      duration: 0.5,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 1.3,
    },
  },
};

export default function Hero(props: HeroProps) {
  const [phase, cyclePhase] = useCycle<"title1" | "title2">("title1", "title2");

  useEffect(() => {
    const id = setInterval(cyclePhase, INTERVAL);
    return () => clearInterval(id);
  }, [cyclePhase]);

  return (
    <section className="w-screen h-screen relative px-8">
      <video
        className="absolute inset-0 left-0 w-full h-full object-cover"
        src={props.videoSource}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="w-full h-full grid grid-cols-full px-8">
        <motion.div className="relative overflow-hidden font-bold text-sand-50 text-[5rem] leading-24 col-start-3 self-center text-center col-span-8 mx-auto">
          <h1>
            {props.heroTitle1.split(/(\s+)/).map((l, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
              >
                <motion.span
                  variants={topLine}
                  initial="show"
                  animate={phase === "title1" ? "show" : "hidden"}
                  transition={letterTransition(i)}
                  className="inline-block"
                >
                  {l === " " ? "\u00A0" : l}
                </motion.span>
              </span>
            ))}
          </h1>

          <h1 className="absolute inset-0">
            {props.heroTitle2.split(/(\s+)/).map((l, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
              >
                <motion.span
                  variants={bottomLine}
                  initial="hidden"
                  animate={phase === "title1" ? "hidden" : "show"}
                  transition={letterTransition(i)}
                  className="inline-block"
                >
                  {l === " " ? "\u00A0" : l}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="flex flex-col items-center absolute bottom-10 left-1/2 -translate-x-1/2 text-sand-50">
          <p>Scroll</p>
          <motion.div
            className="size-1 rounded-full relative top-7 bg-sand-50"
            variants={scrollDot}
            animate="animate"
          />
        </div>
      </div>
    </section>
  );
}
