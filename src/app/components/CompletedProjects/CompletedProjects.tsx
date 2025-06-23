"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../CommonComponents/Arrow";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import BigPost from "../CommonComponents/BigPost";

const completedProjectsData = [
  {
    id: 1,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    date: "24.06.2024 - 01.03.2025",
    title:
      "ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională de...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    date: "12.02.2025",
    title:
      "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecvente și cum poți să...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 3,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    date: "24.06.2024 - 01.03.2025",
    title: "Biodiversitate și raportarea sustenabilității: de la ODD la ESRS",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 4,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    date: "12.02.2025",
    title:
      "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecvente și cum poți să...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
];

const CompletedProjects = () => {
  const tCompletedProjects = useTranslations("index.CompletedProjects");
  const router = useRouter();
  const itemsVisible = 2;
  const gap = 24;
  const canScroll = completedProjectsData.length > itemsVisible;

  const initialIndex = canScroll ? itemsVisible : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [transition, setTransition] = useState({
    type: "tween",
    ease: "easeInOut",
    duration: 0.7,
  });
  const [isClickable, setIsClickable] = useState(true);

  const [dragStartPos, setDragStartPos] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const extendedProjectsData = useMemo(() => {
    if (!canScroll) return completedProjectsData;
    const startClones = completedProjectsData
      .slice(0, itemsVisible)
      .map((item) => ({ ...item, id: `${item.id}-clone-start` }));
    const endClones = completedProjectsData
      .slice(-itemsVisible)
      .map((item) => ({ ...item, id: `${item.id}-clone-end` }));
    return [...endClones, ...completedProjectsData, ...startClones];
  }, [canScroll]);

  const maxPageIndex = canScroll
    ? completedProjectsData.length - itemsVisible
    : 0;
  const numPages = canScroll ? maxPageIndex + 1 : 1;
  const currentPageIndex = canScroll
    ? (((currentIndex - initialIndex) % numPages) + numPages) % numPages
    : 0;
  const progressPercentage =
    maxPageIndex > 0 ? (currentPageIndex / maxPageIndex) * 100 : 0;

  const handleNavigation = (direction: number) => {
    if (!isClickable || !canScroll) return;
    setIsClickable(false);
    if (transition.duration === 0) {
      setTransition({ type: "tween", ease: "easeInOut", duration: 0.7 });
    }
    setCurrentIndex((prev) => prev + direction);
  };

  const handleAnimationComplete = () => {
    if (currentIndex === initialIndex - 1) {
      setTransition({ type: "tween", ease: "easeInOut", duration: 0 });
      setCurrentIndex(initialIndex + completedProjectsData.length - 1);
    } else if (currentIndex === initialIndex + completedProjectsData.length) {
      setTransition({ type: "tween", ease: "easeInOut", duration: 0 });
      setCurrentIndex(initialIndex);
    } else {
      setIsClickable(true);
    }
  };

  useEffect(() => {
    if (transition.duration === 0) {
      setTimeout(() => {
        setTransition({ type: "tween", ease: "easeInOut", duration: 0.7 });
        setIsClickable(true);
      }, 50);
    }
  }, [transition.duration]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPointerDown(true);
    setDragStartPos(e.clientX);
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>,
    link: string | null
  ) => {
    if (!isPointerDown) return;
    const dragEndPos = e.clientX;
    const dragDistance = dragEndPos - dragStartPos;
    const swipeThreshold = 50;
    const clickThreshold = 5;

    if (dragDistance < -swipeThreshold) {
      handleNavigation(1);
    } else if (dragDistance > swipeThreshold) {
      handleNavigation(-1);
    } else if (link && Math.abs(dragDistance) < clickThreshold) {
      router.push(link);
    }
    setIsPointerDown(false);
  };

  const handlePointerLeave = () => {
    setIsPointerDown(false);
  };

  return (
    <section className="w-screen min-h-screen relative bg-sand-50 flex items-center">
      <div className="grid-cols-full grid py-24 relative w-full">
        <div className="col-span-full flex justify-between items-center mb-12">
          <AnimatedHeader
            customStyles="text-5xl font-bold text-forest-900"
            text={tCompletedProjects("completed_projects_header")}
          />
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleNavigation(-1)}
              disabled={!isClickable || !canScroll}
            >
              <Arrow arrowCustomStyle="-rotate-180 fill-sand-50" />
            </button>
            <button
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleNavigation(1)}
              disabled={!isClickable || !canScroll}
            >
              <Arrow arrowCustomStyle="fill-sand-50" />
            </button>
          </div>
        </div>

        <div
          className="col-span-full overflow-hidden cursor-grab"
          onPointerDown={handlePointerDown}
          onPointerUp={(e) => handlePointerUp(e, null)}
          onPointerLeave={handlePointerLeave}
        >
          <motion.div
            className="flex"
            style={{ columnGap: `${gap}px`, pointerEvents: "none" }}
            animate={{ x: `calc(-${currentIndex} * (50% + ${gap / 2}px))` }}
            transition={transition}
            onAnimationComplete={handleAnimationComplete}
          >
            {extendedProjectsData.map((project) => (
              <div
                key={project.id}
                style={{
                  flex: `0 0 calc(100% / ${itemsVisible} - ${
                    (gap * (itemsVisible - 1)) / itemsVisible
                  }px)`,
                  pointerEvents: "auto",
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  handlePointerUp(e, `/`);
                }}
              >
                <BigPost
                  tags={project.tags}
                  imageSrc={project.image}
                  imageAlt={project.title}
                  title={project.title}
                  description={project.description}
                  date={project.date}
                  link="/"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="col-span-full mt-12 flex flex-col items-center">
          <div className="bg-stone-300 h-[2px] w-full">
            <motion.div
              className="bg-forest-900 h-full"
              animate={{ width: canScroll ? `${progressPercentage}%` : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
          <LinkWithArrow
            text={tCompletedProjects("see_more_projects")}
            href="/"
            arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
            customStyle="flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                                 [&>div:nth-child(1)]:px-4 [&>div]:text-sand-50 [&>div]:bg-forest-700 gap [&>div]:group-hover/link:bg-forest-800 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
