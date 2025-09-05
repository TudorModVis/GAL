import { getTranslations } from 'next-intl/server'
import React from 'react'

import Client from './Client'

export async function generateMetadata() {
	const t = await getTranslations('index.meta.map')
	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			images: [{ url: '/meta_image.jpg' }]
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/meta_image.jpg']
		}
	}
}

export default async function Page() {
	return (
		<main className='bg-sand-50 w-full h-screen'>
			<Client />
		</main>
	)
}
