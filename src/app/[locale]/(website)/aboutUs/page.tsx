import { getTranslations, setRequestLocale } from 'next-intl/server'

import Donation from '@/components/Donation/Donation'
import Hero from '@/components/HeroSection/Hero'
import LastNews from '@/components/LastNews/LastNews'
import MainSection from '@/components/ListAndStatistics/MainSection'
import Members from '@/components/Members/Members'

export async function generateMetadata() {
	const t = await getTranslations('index.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations('aboutUs')
	return (
		<>
			<main className='relative mb-12 sm:mb-[100vh] bg-sand-50'>
				<Hero
					heroTitle1={t('heroTitle.1')}
					heroTitle2={t('heroTitle.2')}
					videoSource='../despre-video.webm'
					posterSource='../videoPoster.jpg'
				/>
				<MainSection />
				<LastNews />
				<Members />
				<Donation />
			</main>
		</>
	)
}
