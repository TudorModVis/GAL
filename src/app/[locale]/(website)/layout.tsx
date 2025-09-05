'use client'

import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'

import Footer from '@/components/Footer/Footer'
import NavBar from '@/components/NavBar/NavBar'
import { GlobalTransitionProvider } from '@/components/providers/GlobalTransitionProvider'

const HIDE_CHROME_ROUTES = ['/map', '/mapa', '/карта']

export default function WebsiteLayout({ children }: PropsWithChildren<unknown>) {
	const pathname = usePathname()
	const hideChrome = HIDE_CHROME_ROUTES.some(
		route => pathname === route || pathname.endsWith(route)
	)

	return (
		<div>
			<GlobalTransitionProvider>
				{!hideChrome && <NavBar />}
				{children}
				{!hideChrome && <Footer />}
			</GlobalTransitionProvider>
		</div>
	)
}
