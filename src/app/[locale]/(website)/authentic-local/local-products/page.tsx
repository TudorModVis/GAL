import { getTranslations, setRequestLocale } from 'next-intl/server'

import InfoSection, { Breadcrumb } from '@/components/CommonComponents/InfoSection'
import Visualization from '@/components/CommonComponents/Visualization'
import Donation from '@/components/Donation/Donation'

export async function generateMetadata() {
	const t = await getTranslations('index.meta.localProducts')

	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			images: [{ url: '/localProducts_image.png' }]
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/localProducts_image.png']
		}
	}
}

export default async function LocalProducts({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations('index.LocalProducts')
	const tCategories = await getTranslations('BlogCategories')

	const tagKey = ['LOCAL_PRODUCTS']
	const tags: string[] = Array.isArray(tagKey)
		? tagKey.map(k => tCategories(k))
		: [tCategories(tagKey)]

	const locRaw = t.raw('location') as Record<string, string>

	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'Authentic Local', link: '/authentic-local' },
		{ text: locRaw['2'] ?? 'Local Products', link: '/authentic-local/local-products' }
	]

	return (
		<main className='relative w-full h-fit mb-12 sm:mb-[100vh] bg-sand-50'>
			<InfoSection
				tags={tags}
				headerText={t('title')}
				location={location}
				imageSrc='/localProducts_image.png'
				imageAlt='Local Products Images'
				locale={locale}
			/>
			<Visualization
				header={t('visualization_header')}
				description={t('visualization_text')}
				type='AUTHENTIC_LOCAL'
				authenticType='LOCAL_PRODUCTS'
			/>
			<Donation />
		</main>
	)
}
