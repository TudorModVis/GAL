'use client'

import { Variants, motion, useInView } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface TextProps {
	customStyles?: string
	text: string
}

const AnimatedHeader: React.FC<TextProps> = ({ customStyles = '', text }) => {
	const headerRef = useRef<HTMLHeadingElement>(null)
	const words = text.split(/\s+/).filter(Boolean)
	const isShort = words.length < 3
	const wordRefs = useRef<(HTMLSpanElement | null)[]>(Array(words.length).fill(null))
	const [lines, setLines] = useState<number[][]>([])

	if (wordRefs.current.length !== words.length) {
		wordRefs.current = Array(words.length).fill(null)
	}

	const buildLines = () => {
		if (isShort) {
			setLines([Array.from({ length: words.length }, (_, i) => i)])
			return
		}

		const tmp: number[][] = []
		let currentTop: number | null = null

		words.forEach((_, idx) => {
			const el = wordRefs.current[idx]
			if (!el) return
			const top = el.offsetTop

			if (currentTop === null) {
				currentTop = top
				tmp.push([idx])
				return
			}

			if (top !== currentTop) {
				currentTop = top
				tmp.push([])
			}
			tmp[tmp.length - 1].push(idx)
		})

		setLines(tmp)
	}

	useLayoutEffect(() => {
		buildLines()
	}, [text])

	useEffect(() => {
		if (!headerRef.current || isShort) return
		const ro = new ResizeObserver(buildLines)
		ro.observe(headerRef.current)
		window.addEventListener('resize', buildLines)
		return () => {
			ro.disconnect()
			window.removeEventListener('resize', buildLines)
		}
	}, [isShort])

	const lineVariants: Variants = {
		hidden: { y: '100%' },
		visible: (i: number) => ({
			y: 0,
			transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }
		})
	}

	const measurementLayer = !isShort && (
		<span
			aria-hidden
			style={{
				position: 'absolute',
				visibility: 'hidden',
				pointerEvents: 'none',
				userSelect: 'none',
				top: 0,
				left: 0,
				width: '100%',
				whiteSpace: 'pre-wrap'
			}}
		>
			{words.map((w, i) => (
				<span
					key={`measure-${i}`}
					ref={el => {
						wordRefs.current[i] = el
					}}
				>
					{w}
					{i !== words.length - 1 && ' '}
				</span>
			))}
		</span>
	)

	const isInView = useInView(headerRef, { once: true })

	const renderLine = (content: React.ReactNode, idx: number) => (
		<span
			key={`mask-${idx}`}
			style={{ display: 'block', overflow: 'hidden' }}
		>
			<motion.span
				custom={idx}
				variants={lineVariants}
				style={{ display: 'inline-block' }}
			>
				{content}
			</motion.span>
		</span>
	)

	return (
		<motion.h2
			ref={headerRef}
			className={customStyles}
			style={{ position: 'relative' }}
			initial='hidden'
			animate={isInView ? 'visible' : 'hidden'}
		>
			{isShort
				? renderLine(text, 0)
				: lines.map((line, idx) =>
						renderLine(
							line.map((wordIdx, innerIdx) => (
								<span key={wordIdx}>
									{words[wordIdx]}
									{innerIdx !== line.length - 1 && ' '}
								</span>
							)),
							idx
						)
					)}
			{measurementLayer}
		</motion.h2>
	)
}

export default AnimatedHeader
