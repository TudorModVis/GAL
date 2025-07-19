import { getTranslations, setRequestLocale } from 'next-intl/server'

import InfoSection, { Breadcrumb } from '@/components/CommonComponents/InfoSection'
import Visualization from '@/components/CommonComponents/Visualization'
import Donation from '@/components/Donation/Donation'

export async function generateMetadata() {
	const t = await getTranslations('index.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function LocalProducts({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations('index.TouristAttractions')
	const tCategories = await getTranslations('BlogCategories')

	const tagKey = ['TOURIST_ATTRACTIONS']
	const tags: string[] = Array.isArray(tagKey)
		? tagKey.map(k => tCategories(k))
		: [tCategories(tagKey)]

	const locRaw = t.raw('location') as Record<string, string>

	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'Authentic Local', link: '/authentic-local' },
		{ text: locRaw['2'] ?? 'Tourist Attractions', link: '/authentic-local/tourist-attractions' }
	]

	return (
		<main className='relative w-full h-fit mb-[100vh] bg-sand-50'>
			<InfoSection
				tags={tags}
				headerText={t('title')}
				location={location}
				imageSrc='/touristAttractions_image.png'
				imageAlt='Local Products Images'
				locale={locale}
			/>
			<Visualization
				header={t('visualization_header')}
				description={t('visualization_text')}
				type='AUTHENTIC_LOCAL'
				authenticType='TOURIST_ATTRACTIONS'
			/>
			<Donation />
		</main>
	)
}
