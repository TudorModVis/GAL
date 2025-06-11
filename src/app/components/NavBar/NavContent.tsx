import React, { useState } from "react";
import Logo from "../Logo";
import LinkWithArrow from "../LinkWithArrow";
import Link from "next/link";
import ArrowDown from "./ArrowDown";
import { motion, useAnimation, AnimatePresence, delay } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

interface ArrowColor {
  arrowColor?: string;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavContent: React.FC<ArrowColor> = ({ arrowColor }) => {
  const controls = useAnimation();
  const [hoveredMenu, setHoveredMenu] = useState<null | "despre" | "autentic">(
    null
  );
  const [hoveredSubMenu, setHoveredSubMenu] = useState<
    | null
    | "despre_noi"
    | "conducerea_gal"
    | "documente_oficiale"
    | "produse_locale"
    | "servicii_din_comunitate"
    | "atractii_turistice"
    | "oameni_si_valori"
  >(null);

  const boxVariants = {
    initial: {
      height: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      height: "420%",
      transition: { duration: 0.5 },
    },
  };

  const textVariants = {
    initial: {
      color: arrowColor,
      transition: { duration: 0.4 },
    },
    hover: {
      color: "#11200B",
      transition: { duration: 0.4 },
    },
  };

  const lineVariants = {
    initial: {
      background: "#FFFEFD",
      transition: { duration: 0.4 },
    },
    hover: {
      background: "#BFBFBE",
      transition: { duration: 0.4 },
    },
  };

  const dropDownVariants = {
    initial: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
    hover: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  const handleHoverStart = (menu: "despre" | "autentic") => {
    setHoveredMenu(menu);
    controls.start("hover");
  };

  const handleHoverEnd = () => {
    setTimeout(() => {
      setHoveredMenu(null);
      controls.start("initial");
    }, 700);
  };

  return (
    <>
      <motion.div
        variants={boxVariants}
        animate={hoveredMenu ? "hover" : "initial"}
        initial="initial"
        className="bg-sand-50 origin-top top-0 w-[400%] -left-[100%] absolute -z-10"
      ></motion.div>
      <AnimatePresence>
        {hoveredMenu && (
          <motion.div
            className="absolute left-0 top-[120%] w-full h-[300%] grid grid-cols-full"
            onMouseEnter={() => controls.start("hover")}
            onMouseLeave={handleHoverEnd}
          >
            {hoveredMenu === "despre" && (
              <motion.div
                variants={dropDownVariants}
                initial="initial"
                animate="hover"
                exit="initial"
                className="col-span-3 col-start-3 despregal"
              >
                <LinkWithArrow
                  onMouseEnter={() => setHoveredSubMenu("despre_noi")}
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Despre Noi"
                  fill=""
                  href=""
                  style="split"
                />
                <div className="w-full h-[1px] bg-stone-400"></div>
                <LinkWithArrow
                  onMouseEnter={() => setHoveredSubMenu("conducerea_gal")}
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Conducerea GAL-ului"
                  fill=""
                  href=""
                  style="split"
                />
                <div className="w-full h-[1px] bg-stone-400"></div>
                <LinkWithArrow
                  onMouseEnter={() => setHoveredSubMenu("documente_oficiale")}
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Documente Oficiale"
                  fill=""
                  href=""
                  style="split"
                />
              </motion.div>
            )}
            {hoveredMenu === "autentic" && (
              <motion.div
                variants={dropDownVariants}
                initial="initial"
                animate="hover"
                exit="initial"
                className="col-span-3 col-start-3 autenticlocal"
              >
                <LinkWithArrow
                  onMouseEnter={() => setHoveredSubMenu("produse_locale")}
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Produse Locale"
                  fill=""
                  href=""
                  style="split"
                />
                <div className="w-full h-[1px] bg-stone-400"></div>
                <LinkWithArrow
                  onMouseEnter={() =>
                    setHoveredSubMenu("servicii_din_comunitate")
                  }
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Servicii din Comunitate"
                  fill=""
                  href=""
                  style="split"
                />
                <div className="w-full h-[1px] bg-stone-400"></div>
                <LinkWithArrow
                  onMouseEnter={() => setHoveredSubMenu("atractii_turistice")}
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Atracții Turistice"
                  fill=""
                  href=""
                  style="split"
                />
                <div className="w-full h-[1px] bg-stone-400"></div>
                <LinkWithArrow
                  onMouseEnter={() => setHoveredSubMenu("oameni_si_valori")}
                  onMouseLeave={() => setHoveredSubMenu(null)}
                  circle="bg-forest-800"
                  backgroundColor="bg-sand-50"
                  insideColor="#11200B"
                  text="Oameni și Valori"
                  fill=""
                  href=""
                  style="split"
                />
              </motion.div>
            )}
            <motion.div className="relative col-span-4 col-start-8 mb-6">
              {hoveredSubMenu === "despre_noi" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
              {hoveredSubMenu === "conducerea_gal" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
              {hoveredSubMenu === "documente_oficiale" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
              {hoveredSubMenu === "produse_locale" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
              {hoveredSubMenu === "servicii_din_comunitate" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
              {hoveredSubMenu === "atractii_turistice" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
              {hoveredSubMenu === "oameni_si_valori" && (
                <motion.img
                  src="/donation_image.png"
                  alt="image"
                  className="rounded-lg w-full h-full"
                  variants={dropDownVariants}
                  initial="initial"
                  animate="hover"
                  exit="initial"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Logo color="#254119" />
      <motion.div
        variants={textVariants}
        initial="initial"
        animate={controls}
        className="flex gap-8 col-span-6 col-start-3"
      >
        <Link href="/">Acasă</Link>
        <motion.div
          onHoverStart={() => handleHoverStart("despre")}
          className="flex gap-1 items-center cursor-pointer"
        >
          Despre GAL
          <ArrowDown
            arrowColor={
              hoveredMenu === "autentic" || hoveredMenu === "despre"
                ? "#11200B"
                : arrowColor
            }
          />
        </motion.div>
        <Link href="/">Noutați</Link>
        <Link href="/">Proiecte</Link>
        <motion.div
          onHoverStart={() => handleHoverStart("autentic")}
          className="flex gap-1 items-center cursor-pointer"
        >
          Autentic Local
          <ArrowDown
            arrowColor={
              hoveredMenu === "autentic" || hoveredMenu === "despre"
                ? "#11200B"
                : arrowColor
            }
          />
        </motion.div>
        <Link href="/">Contacte</Link>
      </motion.div>

      <div className="col-start-10 col-span-3 flex items-center gap-6">
        <LanguageSwitcher
          arrowColor={
            hoveredMenu === "autentic" || hoveredMenu === "despre"
              ? "#11200B"
              : arrowColor
          }
        />
        <LinkWithArrow
          backgroundColor="bg-forest-800"
          insideColor="#FFFEFD"
          text="Harta resurselor"
          href="/"
          style="default"
        />
      </div>
      <motion.div
        variants={lineVariants}
        animate={hoveredMenu ? "hover" : "initial"}
        initial="initial"
        className="bg-sand-50 w-[400%] h-[1px] absolute bottom-0 -left-[100%]"
      ></motion.div>
    </>
  );
};

export default NavContent;
