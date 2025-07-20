import { getTranslations, setRequestLocale } from 'next-intl/server'

import Administration from '@/components/Administration/Administration'

export async function generateMetadata() {
	const t = await getTranslations('index.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function AdministationPage({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)
	return <Administration />
}
