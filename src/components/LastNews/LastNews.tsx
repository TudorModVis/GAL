"use client";
import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../CommonComponents/Arrow";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import SmallPost from "../CommonComponents/SmallPost";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const newsData = [
  {
    id: 1,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 2,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 3,
    image: "/donation_image.png",
    tags: ["Logistică", "Noutate"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 4,
    image: "/breaker_image.png",
    tags: ["Antreprenorial", "Noutate"],
    title: "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecve...",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 5,
    image: "/donation_image.png",
    tags: ["Noutate", "Public"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 6,
    image: "/breaker_image.png",
    tags: ["Logistică", "Public"],
    title: "A sixth interesting news title for the slider example.",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 7,
    image: "/donation_image.png",
    tags: ["Noutate", "Public"],
    title: "ECOMONDO – The Green Technology Expo, cea mai mare...",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 8,
    image: "/breaker_image.png",
    tags: ["Logistică", "Public"],
    title: "A sixth interesting news title for the slider example.",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
  {
    id: 9,
    image: "/breaker_image.png",
    tags: ["Logistică", "Public"],
    title: "A sixth interesting news title for the slider example.",
    description: "Nr. populației totale în cadrul componenței teritoriale...",
  },
];

const LastNews = () => {
  const tLastNews = useTranslations("index.LastNews");
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < newsData.length; i += 3) {
      pages.push(newsData.slice(i, i + 3));
    }
    return pages;
  }, []);

  const totalSlides = newsPages.length;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    onInit: () => setCurrentSlide(0),
    afterChange: (current: number) => setCurrentSlide(current),
  };

  return (
    <section className="w-screen h-fit py-24 relative bg-forest-600 flex items-center">
      <div className="grid-cols-full grid relative w-full">
        <div className="col-span-full flex justify-between items-center mb-12">
          <AnimatedHeader
            customStyles="text-5xl font-bold text-sand-50"
            text={tLastNews("last_news_header")}
          />
          <div className="flex gap-2 items-center">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer"
            >
              <Arrow arrowCustomStyle="-rotate-180 fill-forest-900" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer"
            >
              <Arrow arrowCustomStyle="fill-forest-900" />
            </button>
          </div>
        </div>

        <div className="col-span-full overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {newsPages.map((page, pageIndex) => (
              <div key={pageIndex} className="outline-none">
                <div className="grid grid-cols-12 gap-x-6">
                  {page.map((news) => (
                    <div key={news.id} className="col-span-4">
                      <SmallPost
                        tags={news.tags}
                        imageSrc={news.image}
                        imageAlt={news.title}
                        title={news.title}
                        description={news.description}
                        link={`/news/${news.id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="col-span-full mt-12 flex flex-col items-center">
          <div className="bg-stone-500/50 h-[2px] w-full">
            <motion.div
              className="bg-white h-full"
              animate={{
                width: `${
                  totalSlides > 1
                    ? (currentSlide / (totalSlides - 1)) * 100
                    : 100
                }%`,
              }}
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