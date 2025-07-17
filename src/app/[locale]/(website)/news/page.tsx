import { getTranslations, setRequestLocale } from 'next-intl/server'

import InfoSection from '@/components/CommonComponents/InfoSection'
import Visualization from '@/components/CommonComponents/Visualization'
import Donation from '@/components/Donation/Donation'

export async function generateMetadata() {
	const t = await getTranslations('index.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function News({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations('index.News')

	return (
		<>
			<main className='relative w-full h-fit mb-[100vh] bg-sand-50'>
				<InfoSection
					tags={['Produse Locale']}
					headerText={t('title')}
					location={Object.values(t.raw('location'))}
					imageSrc='/news_image.png'
					imageAlt='Test'
				/>
				<Visualization
					header={t('visualization_header')}
					description={t('visualization_text')}
					type='NEWS'
				/>
				<Donation />
			</main>
		</>
	)
}
