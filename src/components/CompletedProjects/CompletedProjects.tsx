// "use client";
// import React, { useState, useRef, useMemo } from "react";
// import { motion } from "framer-motion";
// import Slider from "react-slick";
// import AnimatedHeader from "../CommonComponents/AnimatedHeader";
// import { useTranslations } from "next-intl";
// import Arrow from "../CommonComponents/Arrow";
// import LinkWithArrow from "../CommonComponents/LinkWithArrow";
// import BigPost from "../CommonComponents/BigPost";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import AnimatedLine from "../CommonComponents/AnimatedLine";

// const completedProjectsData = [
//   // ... (Your project data remains here)
//   {
//     id: 1,
//     image: "/donation_image.png",
//     tags: ["Antreprenorial", "Noutate"],
//     date: "24.06.2024 - 01.03.2025",
//     title:
//       "ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională de...",
//     description:
//       "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
//   },
//   {
//     id: 2,
//     image: "/breaker_image.png",
//     tags: ["Noutate", "Public"],
//     date: "12.02.2025",
//     title:
//       "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecvente și cum poți să...",
//     description:
//       "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
//   },
//   {
//     id: 3,
//     image: "/donation_image.png",
//     tags: ["Antreprenorial", "Noutate"],
//     date: "24.06.2024 - 01.03.2025",
//     title: "Biodiversitate și raportarea sustenabilității: de la ODD la ESRS",
//     description:
//       "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
//   },
//   {
//     id: 4,
//     image: "/breaker_image.png",
//     tags: ["Noutate", "Public"],
//     date: "12.02.2025",
//     title:
//       "Responsabilitatea Extinsă a Producătorului și 3 greșeli frecvente și cum poți să...",
//     description:
//       "Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...",
//   },
// ];

// const CompletedProjects = () => {
//   const tCompletedProjects = useTranslations("index.CompletedProjects");
//   const sliderRef = useRef<Slider>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // KEY CHANGE 1: Manually double the data for the infinite loop effect.
//   // We add a 'clone' property to give these new items unique keys.
//   const extendedProjects = useMemo(
//     () => [
//       ...completedProjectsData,
//       ...completedProjectsData.map((p) => ({ ...p, id: `${p.id}-clone` })),
//     ],
//     []
//   );

//   const totalOriginalSlides = completedProjectsData.length;

//   // KEY CHANGE 2: Implement the logic to jump back to the start.
//   const handleAfterChange = (current: number) => {
//     // When the slider reaches the first item of the cloned set...
//     if (current >= totalOriginalSlides) {
//       // ...instantly (no animation) jump back to the corresponding slide at the beginning.
//       // A small timeout prevents visual glitches during the transition.
//       setTimeout(() => {
//         sliderRef.current?.slickGoTo(current - totalOriginalSlides, true);
//       }, 150);
//     }
//     // We use the modulo operator to keep the progress bar and slide counter correct.
//     setCurrentSlide(current % totalOriginalSlides);
//   };

//   const settings = {
//     dots: false,
//     speed: 500,
//     arrows: false,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     infinite: false, // Set to false because we are handling the loop ourselves.
//     afterChange: handleAfterChange, // Use our custom handler.
//     slidesToShow: 3,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1.15 } },
//     ],
//   };

//   return (
//     <section className="w-screen relative bg-white flex items-center">
//       <div className="grid-cols-full grid py-24 relative w-full px-4 sm:px-6">
//         <AnimatedLine customStyles="col-span-full mb-4 sm:hidden" />
//         <div className="col-span-full flex justify-between items-center mb-6 sm:mb-12">
//           <AnimatedHeader
//             customStyles="sm:text-5xl text-2xl font-bold text-forest-900"
//             text={tCompletedProjects("completed_projects_header")}
//           />
//           <div className="hidden sm:flex gap-2 items-center">
//             <button
//               onClick={() => sliderRef.current?.slickPrev()}
//               className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer"
//             >
//               <Arrow arrowCustomStyle="-rotate-180 fill-sand-50" />
//             </button>
//             <button
//               onClick={() => sliderRef.current?.slickNext()}
//               className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer"
//             >
//               <Arrow arrowCustomStyle="fill-sand-50" />
//             </button>
//           </div>
//         </div>

//         <div className="col-span-full -mx-2">
//           <Slider ref={sliderRef} {...settings}>
//             {/* KEY CHANGE 3: Map over the new 'extendedProjects' array. */}
//             {extendedProjects.map((project) => (
//               <div key={project.id} className="px-2 h-full outline-none">
//                 <BigPost
//                   className="h-full"
//                   tags={project.tags}
//                   imageSrc={project.image}
//                   imageAlt={project.title}
//                   title={project.title}
//                   description={project.description}
//                   date={project.date}
//                   link="/"
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="col-span-full mt-12 flex flex-col items-center">
//           <div className="bg-stone-300 h-[2px] w-full">
//             <motion.div
//               className="bg-forest-900 h-full"
//               animate={{
//                 // KEY CHANGE 4: The progress bar logic now correctly reflects the "visual" slide.
//                 width: `${
//                   totalOriginalSlides > 1
//                     ? (currentSlide / (totalOriginalSlides - 1)) * 100
//                     : 100
//                 }%`,
//               }}
//               transition={{ ease: "easeInOut", duration: 0.5 }}
//             />
//           </div>
//           <LinkWithArrow
//             text={tCompletedProjects("see_more_projects")}
//             href="/"
//             arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
//             customStyle="flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4 [&>div]:text-sand-50 [&>div]:bg-forest-700 gap [&>div]:group-hover/link:bg-forest-800 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CompletedProjects;

"use client";
import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import AnimatedHeader from "../CommonComponents/AnimatedHeader";
import { useTranslations } from "next-intl";
import Arrow from "../CommonComponents/Arrow";
import LinkWithArrow from "../CommonComponents/LinkWithArrow";
import BigPost from "../CommonComponents/BigPost";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimatedLine from "../CommonComponents/AnimatedLine";

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
  {
    id: 5,
    image: "/donation_image.png",
    tags: ["Antreprenorial", "Noutate"],
    date: "24.06.2024 - 01.03.2025",
    title: "A fifth amazing project title goes here",
    description:
      "Description for the fifth project, showcasing more great work and sustainable solutions.",
  },
  {
    id: 6,
    image: "/breaker_image.png",
    tags: ["Noutate", "Public"],
    date: "12.02.2025",
    title:
      "Sixth project about producer responsibility and common mistakes to avoid.",
    description:
      "Detailed description for the sixth project focusing on new public initiatives and producer responsibilities.",
  },
];

const CompletedProjects = () => {
  const tCompletedProjects = useTranslations("index.CompletedProjects");
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const projectPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < completedProjectsData.length; i += 2) {
      pages.push(completedProjectsData.slice(i, i + 2));
    }
    return pages;
  }, []);

  const totalSlides = projectPages.length;

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
    <section className="w-screen min-h-screen relative bg-sand-50 flex items-center">
      <div className="grid-cols-full grid py-24 relative w-full">
        <AnimatedLine customStyles="col-span-full mb-4 sm:hidden" />
        <div className="col-span-full flex justify-between items-center mb-6 sm:mb-12">
          <AnimatedHeader
            customStyles="sm:text-5xl text-2xl font-bold text-forest-900"
            text={tCompletedProjects("completed_projects_header")}
          />
          <div className="hidden sm:flex gap-2 items-center">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer"
            >
              <Arrow arrowCustomStyle="-rotate-180 fill-sand-50" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer"
            >
              <Arrow arrowCustomStyle="fill-sand-50" />
            </button>
          </div>
        </div>

        <div className="col-span-full overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {projectPages.map((page, pageIndex) => (
              <div key={pageIndex} className="outline-none">
                <div className="grid grid-cols-12 gap-x-6">
                  {page.map((project) => (
                    <div key={project.id} className="col-span-6">
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
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="col-span-full mt-12 flex flex-col items-center">
          <div className="bg-stone-300 h-[2px] w-full">
            <motion.div
              className="bg-forest-900 h-full"
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
            text={tCompletedProjects("see_more_projects")}
            href="/"
            arrowProps="group-hover/link:rotate-0 -rotate-45 fill-sand-50"
            customStyle="flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4 [&>div]:text-sand-50 [&>div]:bg-forest-700 gap [&>div]:group-hover/link:bg-forest-800 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3"
          />
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;