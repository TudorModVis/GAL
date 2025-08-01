'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import ArrowDown from './ArrowDown'

interface ArrowColor {
	arrowColor?: string
}

const locales = ['RO', 'EN', 'RU']

const LanguageSwitcher: React.FC<ArrowColor> = ({ arrowColor }) => {
	const pathname = usePathname()
	const router = useRouter()
	const [isHovered, setIsHovered] = useState(false)

	function useIsMobile(breakpoint = 640) {
		const [isMobile, setIsMobile] = useState(false)
		useEffect(() => {
			const check = () => setIsMobile(window.innerWidth < breakpoint)
			check()
			window.addEventListener('resize', check)
			return () => window.removeEventListener('resize', check)
		}, [breakpoint])
		return isMobile
	}

	const isMobile = useIsMobile()

	const currentLocale = pathname.startsWith('/en') ? 'EN' : pathname.startsWith('/ru') ? 'RU' : 'RO'

	const changeLocale = (newLocale: string) => {
		const pathWithoutLocale = pathname.replace(/^\/(ro|en|ru)/, '')
		router.push(`/${newLocale.toLowerCase()}${pathWithoutLocale}`)
	}

	const arrowHex = isHovered ? '#11200B' : arrowColor || '#254119'

	return (
		<div
			style={arrowColor ? { color: arrowColor } : undefined}
			className={`relative inline-block group cursor-pointer sm:-mt-2 transition ${isHovered ? 'bg-stone-50' : ''} rounded-t-sm`}
			onMouseEnter={() => {
				if (!isMobile) setIsHovered(true)
			}}
			onMouseLeave={() => {
				if (!isMobile) setIsHovered(false)
			}}
			onClick={() => setIsHovered(!isHovered)}
		>
			<p
				className={`flex gap-1 items-center w-[58px] ${isHovered ? 'text-forest-900' : ''} rounded-t-sm px-2 pt-2`}
			>
				{currentLocale}
				<span className={`transition ${isHovered ? 'rotate-180' : ''}`}>
					<ArrowDown arrowColor={arrowHex} />
				</span>
			</p>
			<div
				className={`absolute ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} w-[58px] transition px-2 py-0.5 left-1/2 -translate-x-1/2 bg-stone-50 text-forest-900 rounded-b-sm z-10`}
			>
				<div className='flex flex-col items-center'>
					{locales
						.filter(loc => loc !== currentLocale)
						.map(loc => (
							<React.Fragment key={loc}>
								<div className='bg-stone-400 w-[42px] h-[1px]'></div>
								<button
									className='flex gap-1 items-center cursor-pointer w-full py-1 hover:text-forest-700'
									onClick={() => changeLocale(loc)}
								>
									{loc}
								</button>
							</React.Fragment>
						))}
				</div>
			</div>
		</div>
	)
}

export default LanguageSwitcher
