'use client'

import React, {useEffect, useRef, useState} from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import LinkWithArrow from '../LinkWithArrow'
import { motion, useMotionValueEvent, useScroll, Variants } from "motion/react"

const NavBar = () => {
  const first = useRef(null);
  const second = useRef(null);
  const { scrollYProgress: scrollYProgressFirst } = useScroll({ target: first, offset: ["start start", "end end"] });
  const { scrollYProgress: scrollYProgressSecond } = useScroll({ target: second, offset: ["start start", "start start"] });
  const [isAtTop, setIsAtTop] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  useMotionValueEvent(scrollYProgressFirst, "change", (position) => {
    setIsAtTop(position === 0)
  })

  useMotionValueEvent(scrollYProgressSecond, "change", (position) => {
    setIsAtTop(position === 0)
  })

  const NavBarAnimation: Variants = {
    initial: {
      // aici e cacatul
      position: "fixed",
      opacity: 0,
      background: "#FFFEFD",
      top: [0, -250],
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
      }
    },
    animate: {
      position: "fixed",
      top: [-250, 0],
      background: "#FFFEFD",
      color: "#11200B",        
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
      }
    }
  }

  return (
    <>
      <motion.nav 
        variants={NavBarAnimation} 
        animate={isAtTop && !isInitialLoad ? "animate" : "initial"} 
        className={`flex items-center transition max-w-[1920px] justify-between w-full m-auto z-10 top-0 px-8 py-4 border-b-[1px] 
        ${isAtTop ? "border-stone-400" : "border-sand-50" } ${isAtTop ? "border-stone-400" : "border-sand-50" }`}>
        <Logo color="#254119" />
        <div className='flex gap-8'>
          <Link href="/">Acasă</Link>
          <Link href="/">Despre GAL</Link>
          <Link href="/">Noutați</Link>
          <Link href="/">Proiecte</Link>
          <Link href="/">Autentic Local</Link>
          <Link href="/">Contacte</Link>
        </div>
        <div>
          <LinkWithArrow backgroundColor="bg-forest-800" insideColor="#FFFEFD" text="Harta resurselor" href="/" style="default"/>
        </div>
      </motion.nav>
      <div ref={first} className='absolute top-[100vh]'></div>
      <div ref={second} className='absolute top-full'></div>
    </>
  )
}

export default NavBar