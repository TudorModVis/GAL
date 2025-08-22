import type { PropsWithChildren } from 'react'

import Footer from '@/components/Footer/Footer'
import NavBar from '@/components/NavBar/NavBar'
import { GlobalTransitionProvider } from '@/components/providers/GlobalTransitionProvider'

export default function WebsiteLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div>
			<NavBar />
			<GlobalTransitionProvider>
				{children}
				<Footer />
			</GlobalTransitionProvider>
		</div>
	)
}
