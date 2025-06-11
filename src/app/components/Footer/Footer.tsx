import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import Image from "next/image";
import Socials from "./Socials";
import AnimatedLine from "../AnimatedLine";
import ContactForm from "./ContactForm";
import { useTranslations } from "next-intl";

const Footer = () => {
  const tFooter = useTranslations("index.Footer");

  return (
    <footer
      id="footer"
      className="fixed w-screen h-screen flex flex-col justify-between py-8 bottom-0 -z-10 bg-forest-600 text-sand-50"
    >
      <div className="grid grid-cols-full auto-rows-min w-full">
        <div className="col-span-5 flex flex-col">
          <Logo color="#FFFEFD" />
          <h4 className="mt-8">
            {tFooter("useful_information.under_logo_text")}
          </h4>
        </div>
        <div className="flex flex-col gap-2 col-start-1 col-span-3 row-start-2 mt-24">
          <h4 className="mb-4 font-bold">
            {tFooter("useful_information.details_for_contact")}
          </h4>
          <p className="mb-4">{tFooter("useful_information.adress")}</p>
          <Link href="tel:37362026342">Tel: 062 026 342</Link>
          <Link href="/">Fax: 024 184 285</Link>
          <Link href="mailto:info@stejaruldacilor.md" className="mt-4">
            Email: info@stejaruldacilor.md
          </Link>
        </div>
        <div className="flex flex-col gap-2 col-start-4 col-span-2 row-start-2 mt-24">
          <h4 className="mb-4 font-bold">
            {tFooter("useful_information.navigation_links")}
          </h4>
          <Link href="/">{tFooter("useful_information.home_link")}</Link>
          <Link href="/">{tFooter("useful_information.about_us_link")}</Link>
          <Link href="/">
            {tFooter("useful_information.announcements_link")}
          </Link>
          <Link href="/">{tFooter("useful_information.projects_link")}</Link>
          <Link href="/">
            {tFooter("useful_information.success_stories_link")}
          </Link>
          <Link href="/">{tFooter("useful_information.contacts_link")}</Link>
        </div>
        <div className="col-start-7 col-span-6 row-start-1 row-end-4 relative grid grid-cols-6 gap-x-6">
          <ContactForm />
        </div>
      </div>
      {/* <div className='flex flex-col w-[1512px] mx-auto'>
        <AnimatedLine customStyles='opacity-25 mb-2 mt-12 col-span-full' />
        <div className='flex flex-col gap-4'>
          <h4>{tFooter("useful_information.our_partners")}</h4>
          <div className='flex flex-wrap items-center justify-center gap-8 md:justify-between relative h-auto'>
              <Image
                src="/programul_leader.png"
                alt="Programul Leader"
                width={262}
                height={64}
                style={{ objectFit: 'contain' }}
              />
              <Image
                src="/ministerul_agriculturii_si_industriei_alimentare_al_republicii_moldova.png"
                alt="Ministerul agriculturii și industriei alimentare al Republicii Moldova"
                width={202}
                height={129}
                style={{ objectFit: 'contain' }}
              />
              <Image
                src="/aipa.png"
                alt="Aipa"
                width={200}
                height={64}
                style={{ objectFit: 'contain' }}
              />
              <Image
                src="/eu4moldova.png"
                alt="EU4MOLDOVA"
                width={127}
                height={129}
                style={{ objectFit: 'contain' }}
              />
              <Image
                src="/solidarity_fund_pl_in_moldova.png"
                alt="Solidarity Fund PL in Moldova"
                width={152}
                height={129}
                style={{ objectFit: 'contain' }}
              />
          </div>
        </div>
        <div className='flex justify-between items-baseline mt-12 col-span-full'>
          <h4>{tFooter("useful_information.copyright")}</h4>
          <Socials />
          <div className='flex gap-8'>
            <Link href="/">{tFooter("useful_information.terms_and_conditions")}</Link>
            <Link
              className='flex gap-1 items-center group justify-between' 
              href="/">
              Site by Studio Modvis
              <svg width="10" height="10" 
                className='group-hover:animate-spin transition ease-in' 
                style={{ animationTimingFunction: "ease-in-out", animationDuration: "0.7s" }} 
                viewBox="0 0 10 10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.99968C10 7.76126 7.76203 10 4.99998 10C2.23797 10 0 7.76189 0 4.99968C0 4.66771 0.0333576 4.34457 0.0950909 4.03151C2.55162 4.93293 4.97292 2.56128 4.10303 0.0800076C4.3928 0.0302512 4.69323 0 4.99935 0C7.76076 0 9.99936 2.24002 9.99936 5.00032L10 4.99968Z" fill="#FAFAFA"/>
              </svg>
            </Link>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
