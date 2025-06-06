import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='fixed w-screen h-screen grid auto-rows-min grid-cols-full py-8 bottom-0 -z-10 bg-forest-600 text-sand-50'>
      <div className='col-span-5 flex flex-col'>
        <Logo />
        <h4 className='mt-8'>Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni. Nr. populației totale în cadrul componenței teritoriale din cele 14 localități ale raionelor Cimișlia și Căușeni...</h4>
      </div>  
        <div className='flex flex-col gap-2 col-start-1 col-span-3 row-start-2 mt-24'>
          <h4 className='mb-4'>Detalii de contact</h4>
          <p className='mb-4'>Adresa: str. 31 August 1989, s. Selemet, r. Cimișlia, Republica Moldova</p>
          <p>Tel: 062 026 342</p>
          <p>Fax: 024 184 285</p>
          <p className='mt-4'>Email: info@stejaruldacilor.md</p>
        </div>
        <div className='flex flex-col gap-2 col-start-4 col-span-2 row-start-2 mt-24'>
          <h4 className='mb-2'>Link-uri de navigare</h4>
          <Link href="/">Acasă</Link>
          <Link href="/">Despre Noi</Link>
          <Link href="/">Anunțuri</Link>
          <Link href="/">Proiecte</Link>
          <Link href="/">Istorii de succes</Link>
          <Link href="/">Contacte</Link>
        </div>
        <div></div>
    </footer>
  )
}

export default Footer