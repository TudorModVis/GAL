import React, { useState, useEffect } from "react";
import MagnifyGlass from "./MagnifyGlass";
import Cross from "./Cross";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Arrow from "../Arrow";

interface hoveredMenu {
  hoveredMenu: string | null;
  handleHoverEnd: () => void;
}

const Search: React.FC<hoveredMenu> = ({ hoveredMenu, handleHoverEnd }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const lenis = useLenis();

  const handleClick = () => {
    setIsClicked((prev) => !prev);
    if (hoveredMenu) {
      handleHoverEnd();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isClicked) {
      setShowModal(true);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isClicked) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isClicked, lenis]);

  const handleAnimationComplete = () => {
    if (!isClicked) {
      setShowModal(false);
    }
  };

  const modalVariants = {
    initial: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      transition: { delay: 0.1, duration: 0.5 },
    },
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`cursor-pointer flex justify-center items-center rounded-full ${
          isClicked ? "bg-sand-50" : "bg-forest-800"
        } transition duration-400 bg-forest-800 p-3.5`}
      >
        {isClicked ? <Cross /> : <MagnifyGlass />}
      </div>
      {mounted && showModal &&
        createPortal(
          <motion.div
            variants={modalVariants}
            animate={isClicked ? "open" : "initial"}
            initial="initial"
            className="bg-black/35 backdrop-blur-xs flex flex-col -left-[50%] w-[200%] h-screen fixed z-10 top-0"
            onAnimationComplete={handleAnimationComplete}
          >
            <div className="grid-cols-full grid w-full h-screen mb-10 mt-[7.5rem] relative">
              <div className="bg-sand-50 rounded-2xl col-span-8 col-start-3 h-full w-full grid grid-cols-8 grid-rows-[4rem_4rem_1fr] gap-x-6">
                <input
                  className="col-span-full bg-[url(/search.svg)] px-14 bg-[position:1.5rem_center] h-16 bg-no-repeat outline-none"
                  type="search"
                  placeholder="Caută proiecte, noutăți, persoane, ..."
                />
                <div className="h-16 col-span-full flex items-center px-6 space-x-2 border-t border-b border-gray-200">
                  <div
                    onClick={() => setFilter("all")}
                    className={`rounded-full cursor-pointer ${
                      filter === "all"
                        ? "bg-forest-700 text-sand-50"
                        : "bg-sand-50 text-forest-900"
                    } px-4 py-2.5`}
                  >
                    Toate rezultate
                    <span
                      className={`rounded-full ml-2 text-xs bg-sand-50 text-forest-900 px-2 py-0.5`}
                    >
                      100
                    </span>
                  </div>
                  <div
                    onClick={() => setFilter("news")}
                    className={`rounded-full cursor-pointer ${
                      filter === "news"
                        ? "bg-forest-700 text-sand-50"
                        : "bg-sand-50 text-forest-900"
                    } px-4 py-2.5`}
                  >
                    Noutăți
                    <span
                      className={`rounded-full ml-2 text-xs px-2 py-0.5 bg-sand-50 text-forest-900`}
                    >
                      32
                    </span>
                  </div>
                  <div
                    onClick={() => setFilter("projects")}
                    className={`rounded-full cursor-pointer px-4 py-2.5 ${
                      filter === "projects"
                        ? "bg-forest-700 text-sand-50"
                        : "bg-sand-50 text-forest-900"
                    }`}
                  >
                    Proiecte
                    <span
                      className={`rounded-full ml-2 text-xs px-2 py-0.5 bg-sand-50 text-forest-900`}
                    >
                      12
                    </span>
                  </div>
                  <div
                    onClick={() => setFilter("success")}
                    className={`rounded-full cursor-pointer px-4 py-2.5 ${
                      filter === "success"
                        ? "bg-forest-700 text-sand-50"
                        : "bg-sand-50 text-forest-900"
                    } `}
                  >
                    Istorii de success
                    <span
                      className={`rounded-full ml-2 text-xs bg-sand-50 text-forest-900 px-2 py-0.5`}
                    >
                      1432
                    </span>
                  </div>
                </div>
                <div className="col-span-4 col-start-1 pl-12 mt-6 h-full [&>div]:cursor-pointer">
                  <span className="text-stone-600 text-xs">36 rezultate</span>
                  <div className="py-2.5 px-2 group hover:bg-forest-500/20 relative flex items-center transition justify-between">
                    Biodiversitate și raportarea sustenabilității
                    <div className="group-hover:opacity-100 transition opacity-0 rotate-45">
                      <Arrow />
                    </div>
                  </div>
                  <div className="py-2.5 px-2 group hover:bg-forest-500/20 relative flex items-center transition justify-between">
                    ECOMONDO – The Green Technology Expo
                    <div className="group-hover:opacity-100 transition opacity-0 rotate-45">
                      <Arrow />
                    </div>
                  </div>
                  <div className="py-2.5 px-2 group hover:bg-forest-500/20 relative flex items-center transition justify-between">
                    Responsabilitatea Extinsă a Producătorului
                    <div className="group-hover:opacity-100 transition opacity-0 rotate-45">
                      <Arrow />
                    </div>
                  </div>
                  <div className="py-2.5 px-2 group hover:bg-forest-500/20 relative flex items-center transition justify-between">
                    Economia Circulară în industria Textilelor
                    <div className="group-hover:opacity-100 transition opacity-0 rotate-45">
                      <Arrow />
                    </div>
                  </div>
                  <div className="py-2.5 px-2 group hover:bg-forest-500/20 relative flex items-center transition justify-between">
                    The Living First Language Platform
                    <div className="group-hover:opacity-100 transition opacity-0 rotate-45">
                      <Arrow />
                    </div>
                  </div>
                  <div className="py-2.5 px-2 group hover:bg-forest-500/20 relative flex items-center transition justify-between">
                    Coding Aboriginal Languages for Indigenous Literacy (CALIL)
                    <div className="group-hover:opacity-100 transition opacity-0 rotate-45">
                      <Arrow />
                    </div>
                  </div>
                </div>
                <div className="col-span-4 col-start-5 relative rounded-br-2xl overflow-hidden">
                  <div className="absolute top-6 left-6 z-10 flex flex-wrap pr-6 gap-2">
                    <h5 className="text-sand-50 bg-forest-900 rounded-sm px-4 py-1 cursor-default">
                      Antreprenorial
                    </h5>
                    <h5 className="text-sand-50 bg-forest-500 rounded-sm px-4 py-1 cursor-default">
                      Noutate
                    </h5>
                    <h3 className="text-2xl font-bold text-sand-50">
                      ECOMONDO – The Green Technology Expo
                    </h3>
                    <h4 className="leading-4.5 text-sand-50 font-normal">
                      Nr. populației totale în cadrul componenței teritoriale
                      din cele 14 localități ale raionelor Cimișlia și Căușeni.
                      Nr. populației totale în cadrul componenței teritoriale
                      din cele 14 localități ale raionelor Cimișlia și
                      Căușeni...
                    </h4>
                  </div>
                  <Image fill alt="searchImage" src="/searchImage.png" />
                </div>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </>
  );
};
export default Search;
