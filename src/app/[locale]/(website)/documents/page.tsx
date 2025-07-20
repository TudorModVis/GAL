import { getTranslations, setRequestLocale } from 'next-intl/server'

import Documents from '@/components/Documents/Documents'

export async function generateMetadata() {
	const t = await getTranslations('index.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	return <Documents />
}
