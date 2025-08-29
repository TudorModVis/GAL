/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Onest } from 'next/font/google'
import { notFound } from 'next/navigation'

import SmoothScroll from '@/components/providers/SmoothScroll'

import { Providers } from './(admin)/providers'
import { routing } from '@/i18n/routing'

import './globals.css'

export const metadata: Metadata = {
	icons: {
		icon: [
			{ url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
			{ url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/favicon-196.png', sizes: '196x196', type: 'image/png' }
		],
		shortcut: '/favicon.ico'
	}
}

const onest = Onest({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap'
})

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()

	return (
		<html
			lang={locale}
			className='scrollbars-75'
		>
			<body className={`relative ${onest.className} bg-white`}>
				<NextIntlClientProvider messages={messages}>
					<SmoothScroll>
						<Providers>{children}</Providers>
					</SmoothScroll>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
