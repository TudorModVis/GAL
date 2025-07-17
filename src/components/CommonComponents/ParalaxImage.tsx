'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface ParalaxImageProps {
	source: string | undefined
	altText: string
}

const ParalaxImage: React.FC<ParalaxImageProps> = ({ source, altText }) => {
	const ref = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start']
	})

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

	const y = useTransform(scrollYProgress, [0, 1], isMobile ? ['-15%', '15%'] : ['-20%', '20%'])

	return (
		<div
			ref={ref}
			className='relative w-full h-full overflow-hidden rounded-2xl'
		>
			<motion.img
				src={source}
				alt={altText}
				// trebuie de vazut inca cum sa fac ca imaginile sa ajunga
				className='absolute w-full h-[120%] object-cover -top-[15%]'
				style={{ y }}
			/>
		</div>
	)
}

export default ParalaxImage
