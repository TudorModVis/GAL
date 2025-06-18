"use client";

import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { useRef } from "react";

type AnimatedCounterProps = {
  from: number;
  to: number;
  decimals?: number;
  locale?: string;
  animationOptions?: KeyframeOptions;
};

const AnimatedCounter = ({
  from,
  to,
  animationOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true });
  const decimals = Number.isInteger(to) ? 0 : 1;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const format = (n: number) => formatter.format(n).replace(/,/g, ".");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    el.textContent = format(from);

    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      el.textContent = format(to);
      return;
    }

    const controls = animate(from, to, {
      duration: 1.2,
      ease: "easeInOut",
      ...animationOptions,
      onUpdate: (v) => (el.textContent = format(v)),
    });

    return () => controls.stop();
  }, [from, to, inView, animationOptions]);

  return (
    <h2 ref={ref} className="leading-14 font-bold text-5xl">
      {format(from)}
    </h2>
  );
};

export default AnimatedCounter;
