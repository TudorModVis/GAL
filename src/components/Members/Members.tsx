import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedText from '../CommonComponents/AnimatedText'

const Members = () => {
	const tMembers = useTranslations('aboutUs.members')

	return (
		<section className='w-screen min-h-[77vh] h-fit grid grid-cols-full grid-rows-[auto_1fr] relative text-forest-900 mb-16'>
			<AnimatedHeader
				text={tMembers('title')}
				customStyles='font-bold text-2xl sm:text-5xl leading-7 sm:leading-13 col-span-full pt-4 sm:pt-0 mt-20 sm:mt-24 mb-6 sm:mb-12 border-t-[1px] border-stone-400 sm:border-t-0'
			/>
			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col'>
				<div className='w-full sm:h-[67%] max-h-[358px] sm:max-h-none h-full'>
					<Image
						alt='Victor Rudenco'
						src='/victor.png'
						width={300}
						height={400}
						className='rounded-2xl'
						style={{ objectFit: 'cover', height: '100%', width: '100%' }}
					/>
				</div>
				<AnimatedText
					text='Victor Rudenco'
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={tMembers('president')}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>

			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col'>
				<div className='w-full sm:h-[88%] max-h-[358px] sm:max-h-none h-full'>
					<Image
						alt='Ana-Maria Ioniță'
						src='/ana.png'
						width={300}
						height={400}
						className='rounded-2xl'
						style={{ objectFit: 'cover', objectPosition: 'top', height: '100%', width: '100%' }}
					/>
				</div>
				<AnimatedText
					text='Ana-Maria Ioniță'
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={tMembers('director')}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>
			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col'>
				<div className='w-full sm:h-[67%] max-h-[358px] sm:max-h-none h-full'>
					<Image
						alt='Maxim'
						src='/maxim.png'
						width={300}
						height={400}
						className='rounded-2xl'
						style={{ objectFit: 'cover', height: '100%', width: '100%' }}
					/>
				</div>
				<AnimatedText
					text='Maxim Furtună'
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={tMembers('manager')}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>
			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col mb-20 sm:mb-0'>
				<div className='w-full sm:h-[88%] max-h-[358px] sm:max-h-none h-full'>
					<Image
						alt='Dumitru'
						src='/dumitru.png'
						width={300}
						height={400}
						className='rounded-2xl'
						style={{ objectFit: 'cover', objectPosition: 'top', height: '100%', width: '100%' }}
					/>
				</div>
				<AnimatedText
					text='Dumitru Marguleț'
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={tMembers('accountant')}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>
		</section>
	)
}

export default Members
