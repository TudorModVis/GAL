'use client'

import { Variants, motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

interface TextProps {
	customStyles?: string
	text: string
}

const AnimatedText: React.FC<TextProps> = props => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	const textAnimation: Variants = {
		hidden: {
			transform: 'translateY(1.5rem)',
			opacity: 0
		},
		visible: {
			transform: 'translateY(0rem)',
			opacity: 100,
			transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
		}
	}

	return (
		<motion.h4
			className={`${props.customStyles} [&>p]:min-h-[1em]`}
			ref={ref}
			variants={textAnimation}
			initial='hidden'
			animate={isInView ? 'visible' : 'hidden'}
			dangerouslySetInnerHTML={{ __html: props.text }}
		></motion.h4>
	)
}

export default AnimatedText
