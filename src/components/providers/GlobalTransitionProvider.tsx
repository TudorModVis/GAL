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
	const lastPointerDown = useRef<{ x: number; y: number } | null>(null)
	const recentDragRef = useRef(false)
	const recentDragTimer = useRef<number | null>(null)

	const D_FADE_OUT = 600
	const D_FADE_IN = 600
	const D_WAIT_BEFORE_NAV = 600

	useEffect(() => {
		if (firstLoad.current) {
			firstLoad.current = false
		}
		setDisplayChildren(children)
	}, [children, pathname])

	useEffect(() => {
		if (!firstLoad.current && pendingNavRef.current) {
			const raf = requestAnimationFrame(() => {
				setIsTransitioning(false)
			})
			return () => cancelAnimationFrame(raf)
		}
	}, [pathname])

	useEffect(() => {
		function onPointerDown(e: PointerEvent) {
			lastPointerDown.current = { x: e.clientX, y: e.clientY }
		}

		function onPointerUp(e: PointerEvent) {
			if (!lastPointerDown.current) return
			const dx = e.clientX - lastPointerDown.current.x
			const dy = e.clientY - lastPointerDown.current.y
			const dist = Math.hypot(dx, dy)
			if (dist > 8) {
				recentDragRef.current = true
				if (recentDragTimer.current) window.clearTimeout(recentDragTimer.current)
				recentDragTimer.current = window.setTimeout(() => {
					recentDragRef.current = false
				}, 220)
			}
			lastPointerDown.current = null
		}

		function handleClick(e: MouseEvent) {
			if (
				(e as MouseEvent).metaKey ||
				(e as MouseEvent).ctrlKey ||
				(e as MouseEvent).shiftKey ||
				(e as MouseEvent).altKey ||
				e.button !== 0
			)
				return

			const target = e.target as HTMLElement | null
			if (!target) return

			const inSlick = !!target.closest('.slick-slider')
			const isDraggingSlick = !!(
				target.closest('.slick-list.dragging') || target.closest('.slick-slider .dragging')
			)
			if (inSlick && (isDraggingSlick || recentDragRef.current)) return

			const link = target.closest('a') as HTMLAnchorElement | null
			if (!link) return

			if (
				(link.target && link.target !== '_self') ||
				link.hasAttribute('download') ||
				link.rel === 'external' ||
				link.hasAttribute('data-no-transition')
			)
				return

			const href = link.getAttribute('href') || ''

			const isHash = href.startsWith('#')
			const isExternal = href.startsWith('http') || href.startsWith('https')
			const isMailto = href.startsWith('mailto:')
			const isTel = href.startsWith('tel:')
			if (isHash || isExternal || isMailto || isTel) return

			if (href === pathname) return

			e.preventDefault()
			e.stopPropagation()

			pendingNavRef.current = true
			setIsTransitioning(true)

			const totalDelay = D_FADE_OUT + D_WAIT_BEFORE_NAV
			window.setTimeout(() => {
				router.push(href)
			}, totalDelay)
		}

		document.addEventListener('pointerdown', onPointerDown, { capture: true })
		document.addEventListener('pointerup', onPointerUp, { capture: true })
		document.addEventListener('click', handleClick, { capture: true })
		return () => {
			document.removeEventListener('pointerdown', onPointerDown, { capture: true } as any)
			document.removeEventListener('pointerup', onPointerUp, { capture: true } as any)
			document.removeEventListener('click', handleClick, { capture: true } as any)
			if (recentDragTimer.current) window.clearTimeout(recentDragTimer.current)
		}
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
