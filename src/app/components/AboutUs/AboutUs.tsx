'use client'

import React, { useRef } from 'react'
import Moldova from './Moldova'
import LinkWithArrow from '../LinkWithArrow'
import { useTranslations } from 'next-intl'
import { motion, Variants, useInView } from 'framer-motion'


const AboutUs = () => {
  const tAboutUs = useTranslations('index.AboutUs');
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true})

  const line: Variants = {
  hidden:  { width: 0 },
  visible: {
    width: '100%',
    transition: { duration: 0.9, ease: 'easeInOut', delay: 0.1 }
    }
  }

  return (
    <section className='w-screen h-fit grid grid-cols-full relative px-8 my-24'>
      <div className='col-span-6 leading-4.5'>
        <h4 className='font-bold'>{tAboutUs("impact_title")}</h4>
        <h4 className='mt-2 mb-9'>
          {tAboutUs("impact_description")}
        </h4>
        <LinkWithArrow backgroundColor="bg-forest-700" insideColor="sand-50" text={tAboutUs("button_learn_more")} href="/" style="default" />
      </div>
      <div className='col-span-9 mt-72'>
        <h2 className='font-bold text-5xl leading-13'>
          {tAboutUs("main_headline")}
        </h2>
      </div>
      <div className='col-start-9 col-span-4 absolute'>
        <Moldova />
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <motion.div
          ref={ref} 
          className='w-full h-[1px] bg-stone-400'
          variants={line}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        />
        <div className='h-full flex flex-col justify-between'>
          <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_projects_success")}</h4>
          <h2 className='leading-14 font-bold text-5xl'>32+</h2>
        </div>
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <motion.div
          ref={ref} 
          className='w-full h-[1px] bg-stone-400'
          variants={line}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        />
        <div className='h-full flex flex-col justify-between'>
            <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_years_activity")}</h4>
            <h2 className='leading-14 font-bold text-5xl'>2.5</h2>
        </div>
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <motion.div
          ref={ref} 
          className='w-full h-[1px] bg-stone-400'
          variants={line}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        />
        <div className='h-full flex flex-col justify-between'>
          <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_total_population")}</h4>
          <h2 className='leading-14 font-bold text-5xl'>21.648+</h2>
        </div>
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <motion.div
          ref={ref} 
          className='w-full h-[1px] bg-stone-400'
          variants={line}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        />
        <div className='h-full flex flex-col justify-between'>
          <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_total_members")}</h4>
          <h2 className='leading-14 font-bold text-5xl'>29</h2>
        </div>
      </div>
    </section>
  )
}

export default AboutUs

