'use client'

import React from 'react'
import Moldova from './Moldova'
import LinkWithArrow from '../LinkWithArrow'
import { useTranslations } from 'next-intl'
import AnimatedCounter from '../AnimatedCounter'
import AnimatedLine from '../AnimatedLine'


const AboutUs = () => {
  const tAboutUs = useTranslations('index.AboutUs');

  return (
    <section id='aboutUs' className='w-screen h-fit grid grid-cols-full relative px-8 my-24'>
      <div className='col-span-6 leading-4.5'>
        <h4 className='font-bold'>{tAboutUs("impact_title")}</h4>
        <h4 className='mt-2 mb-9'>
          {tAboutUs("impact_description")}
        </h4>
        <LinkWithArrow backgroundColor="bg-forest-700" insideColor="#FFFEFD" text={tAboutUs("button_learn_more")} href="/" style="default" />
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
        <AnimatedLine />
        <div className='h-full flex flex-col justify-between'>
          <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_projects_success")}</h4>
          <div className='flex gap'>
             <AnimatedCounter from={0} to={32} />
             <span className='leading-14 font-bold text-5xl'>+</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <AnimatedLine />
        <div className='h-full flex flex-col justify-between'>
            <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_years_activity")}</h4>
            <div className='flex gap'>
             <AnimatedCounter from={0} to={2.5}/>
            </div>
        </div>
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <AnimatedLine />
        <div className='h-full flex flex-col justify-between'>
          <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_total_population")}</h4>
          <div className='flex gap'>
             <AnimatedCounter from={0} to={21648} />
             <span className='leading-14 font-bold text-5xl'>+</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col col-span-3 row-start-3 mt-24 h-40'>
        <AnimatedLine />
        <div className='h-full flex flex-col justify-between'>
          <h4 className='leading-4.5 mt-2'>{tAboutUs("stat_total_members")}</h4>
          <AnimatedCounter from={0} to={29} />
        </div>
      </div>
    </section>
  )
}

export default AboutUs

