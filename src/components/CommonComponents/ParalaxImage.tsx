'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

interface ParalaxImageProps {
	source: string
	altText: string
}

const ParalaxImage: React.FC<ParalaxImageProps> = ({ source, altText }) => {
	const ref = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start']
	})

	const y = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])

	return (
		<div
			ref={ref}
			className='relative w-full h-full overflow-hidden rounded-2xl'
		>
			<motion.img
				src={source}
				alt={altText}
				className='absolute w-full h-[130%] object-cover -top-[15%]'
				style={{ y }}
			/>
		</div>
	)
}

export default ParalaxImage
