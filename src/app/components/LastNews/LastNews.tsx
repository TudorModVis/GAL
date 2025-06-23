"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../CommonComponents/Arrow";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import SmallPost from "../CommonComponents/SmallPost";

const newsData = [
  {
    id: 1,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 3,
    image: "/donation_image.png",
    tags: ["Logistică", "Noutate"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 4,
    image: "/breaker_image.png",
    tags: ["Antreprenorial", "Noutate"],
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
  {
    id: 5,
    image: "/donation_image.png",
    tags: ["Noutate", "Public"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description:
      "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
  },
];

const LastNews = () => {
  const tLastNews = useTranslations("index.LastNews");
  const router = useRouter();
  const numVisibleItems = 3;
  const canScroll = newsData.length > numVisibleItems;

  const initialIndex = canScroll ? numVisibleItems : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [transition, setTransition] = useState({
    type: "tween",
    ease: "easeInOut",
    duration: 0.7,
  });
  const [isClickable, setIsClickable] = useState(true);

  const [dragStartPos, setDragStartPos] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const extendedNewsData = useMemo(() => {
    if (!canScroll) return newsData;
    const startClones = newsData
      .slice(0, numVisibleItems)
      .map((item) => ({ ...item, id: `${item.id}-clone-start` }));
    const endClones = newsData
      .slice(-numVisibleItems)
      .map((item) => ({ ...item, id: `${item.id}-clone-end` }));
    return [...endClones, ...newsData, ...startClones];
  }, [canScroll]);

  const maxPageIndex = canScroll ? newsData.length - numVisibleItems : 0;
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
      setCurrentIndex(initialIndex + newsData.length - 1);
    } else if (currentIndex === initialIndex + newsData.length) {
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
    <section className="w-screen h-[calc(100vh+3.75rem)] relative bg-forest-600 flex items-center">
      <div className="grid-cols-full grid py-24 relative w-full">
        <div className="col-span-full flex justify-between items-center mb-12">
          <AnimatedHeader
            customStyles="text-5xl font-bold text-sand-50"
            text={tLastNews("last_news_header")}
          />
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleNavigation(-1)}
              disabled={!isClickable || !canScroll}
            >
              <Arrow arrowCustomStyle="-rotate-180 fill-forest-900" />
            </button>
            <button
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleNavigation(1)}
              disabled={!isClickable || !canScroll}
            >
              <Arrow arrowCustomStyle="fill-forest-900" />
            </button>
          </div>
        </div>

        <div
          className="col-span-full px-2 overflow-hidden cursor-grab"
          onPointerDown={handlePointerDown}
          onPointerUp={(e) => handlePointerUp(e, null)}
          onPointerLeave={handlePointerLeave}
        >
          <motion.div
            className="flex"
            style={{ columnGap: "24px", pointerEvents: "none" }}
            animate={{ x: `-${currentIndex * (102 / 3)}%` }}
            transition={transition}
            onAnimationComplete={handleAnimationComplete}
          >
            {extendedNewsData.map((news) => (
              <div
                key={news.id}
                style={{
                  flex: "0 0 calc(100% / 3 - 16px)",
                  pointerEvents: "auto",
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  handlePointerUp(
                    e,
                    `/news/${news.id.toString().split("-")[0]}`
                  );
                }}
              >
                <SmallPost
                  tags={news.tags}
                  imageSrc={news.image}
                  imageAlt={news.title}
                  title={news.title}
                  description={news.description}
                  // The link prop is now just for semantic/SEO purposes
                  link={`/news/${news.id.toString().split("-")[0]}`}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="col-span-full mt-12 flex flex-col items-center">
          <div className="bg-stone-500/50 h-[2px] w-full">
            <motion.div
              className="bg-white h-full"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
          <LinkWithArrow
            text={tLastNews("see_more_news")}
            href="/"
            arrowProps="group-hover/link:rotate-0 -rotate-45 fill-forest-900"
            customStyle="flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                                 [&>div:nth-child(1)]:px-4 [&>div]:bg-sand-50 gap [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
    </section>
  );
};

export default LastNews;
