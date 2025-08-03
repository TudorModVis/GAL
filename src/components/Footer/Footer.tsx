'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedLink from '../CommonComponents/AnimatedLink'
import Logo from '../CommonComponents/Logo'

import ContactForm from './ContactForm'
import Socials from './Socials'
import { Link } from '@/i18n/navigation'

const Footer = () => {
	const tFooter = useTranslations('index.Footer')

	return (
		<footer
			id='footer'
			className='sm:fixed w-screen sm:h-screen flex flex-col justify-between py-8 bottom-0 -z-10 bg-forest-600 text-sand-50'
		>
			<div className='grid grid-cols-full auto-rows-min w-full'>
				<AnimatedLine customStyles='sm:hidden my-12 col-span-full opacity-25' />
				<div className='col-span-full sm:col-span-5 flex flex-col'>
					<Logo color='#FFFEFD' />
					<h4 className='mt-6 sm:mt-8 sm:mb-0 mb-12 leading-4.5'>
						{tFooter('useful_information.under_logo_text')}
					</h4>
				</div>
				<div className='flex flex-col gap-2 sm:col-start-1 col-span-full sm:col-span-3 sm:row-start-2 sm:mt-24'>
					<h4 className='mb-4 font-bold'>{tFooter('useful_information.details_for_contact')}</h4>
					<p className='mb-4'>{tFooter('useful_information.adress')}</p>
					<a href='tel:37362026342'>
						<AnimatedLink text='Tel: 062 026 342' />
					</a>
					<a href='tel:37324184285'>
						<AnimatedLink text='Fax: 024 184 285' />
					</a>
					<a
						href='mailto:info@stejaruldacilor.md'
						className='mt-4'
					>
						<AnimatedLink text='Email: info@stejaruldacilor.md' />
					</a>
				</div>
				<div className='flex flex-col gap-2 sm:col-start-4 col-span-full sm:col-span-2 sm:row-start-2 sm:mt-24'>
					<h4 className='mb-4 font-bold sm:mt-0 mt-6'>
						{tFooter('useful_information.navigation_links')}
					</h4>
					<Link href='/'>
						<AnimatedLink text={tFooter('useful_information.home_link')} />
					</Link>
					<Link href='/aboutUs'>
						<AnimatedLink text={tFooter('useful_information.about_us_link')} />
					</Link>
					<Link href='/news'>
						<AnimatedLink text={tFooter('useful_information.announcements_link')} />
					</Link>
					<Link href='/projects'>
						<AnimatedLink text={tFooter('useful_information.projects_link')} />
					</Link>
					<Link href='/authentic-local'>
						<AnimatedLink text={tFooter('useful_information.authentic_local')} />
					</Link>
				</div>
				<div className='sm:col-start-7 col-span-full sm:col-span-6 row-start-1 sm:row-end-4 relative grid sm:grid-cols-6 sm:gap-x-6'>
					<ContactForm />
				</div>
			</div>
			<div className='grid grid-cols-full auto-rows-min w-full'>
				<div className='sm:hidden block col-span-full mt-6'>
					<Socials />
				</div>
				<AnimatedLine customStyles='opacity-25 col-span-full mt-12 sm:mt-8 mb-2' />
				<div className='col-span-full'>
					<h4 className='sm:mb-0 mb-2'>{tFooter('useful_information.our_partners')}</h4>
					<div className='grid sm:flex justify-between relative items-center [&>*]:cursor-pointer'>
						<Image
							src='/programul_leader.png'
							alt='Programul Leader'
							width={262}
							height={64}
							className='w-[148px] h-[36px] sm:w-[262px] sm:h-[64px] col-span-4'
							style={{ height: 'auto' }}
						/>
						<Image
							src='/ministerul_agriculturii_si_industriei_alimentare_al_republicii_moldova.png'
							alt='Ministerul agriculturii și industriei alimentare al Republicii Moldova'
							width={202}
							height={129}
							className='w-[114px] h-[72px] sm:w-[202px] sm:h-[129px] col-span-4 col-start-5'
							style={{ height: 'auto' }}
						/>
						<Image
							src='/aipa.png'
							alt='Aipa'
							width={200}
							height={64}
							className='w-[112px] h-[36px] sm:w-[200px] sm:h-[64px] col-span-4'
							style={{ height: 'auto' }}
						/>
						<Image
							src='/eu4moldova.png'
							alt='EU4MOLDOVA'
							width={127}
							height={129}
							className='w-[72px] h-[72px] sm:w-[127px] sm:h-[129px] col-span-4 col-start-5 my-4 sm:my-0'
							style={{ height: 'auto' }}
						/>
						<Image
							src='/solidarity_fund_pl_in_moldova.png'
							alt='Solidarity Fund PL in Moldova'
							width={152}
							height={129}
							className='w-[82px] h-[72px] sm:w-[152px] sm:h-[129px] col-span-4'
							style={{ height: 'auto' }}
						/>
					</div>
				</div>
				<div className='mt-12 sm:mt-[4vh] flex justify-between flex-col sm:flex-row items-center sm:items-baseline col-span-full'>
					<h4 className='text-center w-full sm:w-fit sm:text-left'>
						{tFooter('useful_information.copyright')}
					</h4>
					<div className='hidden sm:block'>
						<Socials />
					</div>
					<div className='flex flex-col sm:flex-row gap-2 sm:gap-8 items-center mt-2 sm:mt-0 sm:mb-0 mb-12'>
						<Link href='/'>{tFooter('useful_information.terms_and_conditions')}</Link>
						<Link
							className='flex gap-1 items-center group justify-between'
							href='/'
						>
							Site by Studio Modvis
							<svg
								width='10'
								height='10'
								className='group-hover:animate-spin transition ease-in'
								style={{
									animationTimingFunction: 'ease-in-out',
									animationDuration: '0.7s'
								}}
								viewBox='0 0 10 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M10 4.99968C10 7.76126 7.76203 10 4.99998 10C2.23797 10 0 7.76189 0 4.99968C0 4.66771 0.0333576 4.34457 0.0950909 4.03151C2.55162 4.93293 4.97292 2.56128 4.10303 0.0800076C4.3928 0.0302512 4.69323 0 4.99935 0C7.76076 0 9.99936 2.24002 9.99936 5.00032L10 4.99968Z'
									fill='#FAFAFA'
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
