'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

type TransitionContextType = { isTransitioning: boolean }
const TransitionContext = createContext<TransitionContextType>({ isTransitioning: false })

export function usePageTransition() {
	return useContext(TransitionContext)
}

export function GlobalTransitionProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const firstLoad = useRef(true)
	const [displayChildren, setDisplayChildren] = useState(children)
	const [isTransitioning, setIsTransitioning] = useState(false)

	const pendingNavRef = useRef(false)

	const D_FADE_OUT = 600
	const D_FADE_IN = 600
	const D_WAIT_BEFORE_NAV = 1000

	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false
			setDisplayChildren(children)
			return
		}
		setDisplayChildren(children)
	}, [children, pathname])

	useEffect(() => {
		if (!firstLoad.current) {
			const t = setTimeout(() => setIsTransitioning(false), 0)
			return () => clearTimeout(t)
		}
	}, [pathname])

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				(e as MouseEvent).metaKey ||
				(e as MouseEvent).ctrlKey ||
				(e as MouseEvent).shiftKey ||
				(e as MouseEvent).altKey
			)
				return

			const target = e.target as HTMLElement
			const link = target.closest('a') as HTMLAnchorElement | null
			if (!link) return
			if (link.target && link.target !== '_self') return

			const href = link.getAttribute('href')
			const isLocal =
				href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')

			if (isLocal && href !== pathname) {
				e.preventDefault()
				pendingNavRef.current = true
				setIsTransitioning(true)

				const totalDelay = D_FADE_OUT + D_WAIT_BEFORE_NAV
				setTimeout(() => {
					router.push(href!)
				}, totalDelay)
			}
		}

		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [pathname, router])

	return (
		<TransitionContext.Provider value={{ isTransitioning }}>
			<motion.div
				key={pathname}
				initial={{ opacity: pendingNavRef.current ? 0 : 1 }}
				animate={{ opacity: isTransitioning ? 0 : 1 }}
				transition={{ duration: (isTransitioning ? D_FADE_OUT : D_FADE_IN) / 1000 }}
				onAnimationComplete={() => {
					if (!isTransitioning) pendingNavRef.current = false
				}}
			>
				{displayChildren}
			</motion.div>
		</TransitionContext.Provider>
	)
}
