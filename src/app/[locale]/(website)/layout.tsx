import type { PropsWithChildren } from 'react'

import Footer from '@/components/Footer/Footer'
import NavBar from '@/components/NavBar/NavBar'

export default function WebsiteLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div>
			<NavBar />
			{children}
			<Footer />
		</div>
	)
}
