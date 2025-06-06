import React from 'react'
import Image from 'next/image'
import LinkWithArrow from '../LinkWithArrow'

const Donation = () => {
  return (
    <section className='w-screen h-fit grid grid-cols-donation relative px-8 my-24'>
      <div className='col-span-11 grid grid-cols-11 text-sand-50 bg-forest-800 p-8 rounded-l-2xl'>
        <h3 className='col-span-10 text-5xl font-bold leading-13'>Dorești să ne susții? Contactează-ne!</h3>
        <h4 className='col-span-10 row-start-2 leading-4.5 mt-6'>Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...</h4>
        <div className='col-span-10 row-start-3 mt-32'>
          <LinkWithArrow backgroundColor="bg-sand-50" insideColor="forest-900" text="Contactează-ne" href="/" style="default" />
        </div>  
      </div>
      <div className='col-span-13 bg-black relative rounded-r-2xl '>
        <Image
          src="/donation_image.png"
          alt="Donation Image"
          className="object-cover rounded-r-2xl"
          fill={true}
        />
      </div>
    </section>
  )
}

export default Donation