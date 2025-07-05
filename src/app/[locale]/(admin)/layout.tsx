import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import { Providers } from './providers'
import { ScreenSizeMessage } from '@/components/AdminComponents/ScreenSizeMessage/ScreenSizeMessage'

export const metadata: Metadata = {
	title: {
		default: 'Admin',
		template: '%s | Admin'
	}
}

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<div className='md:hidden bg-green-500 w-screen h-screen flex justify-center items-center px-[1rem]'><ScreenSizeMessage /></div>

			<div className='max-md:hidden'>
				<Providers>
					{children}

					<Toaster
						position='top-right'
						duration={1500}
					/>
				</Providers>
			</div>
		</>
	)
}
