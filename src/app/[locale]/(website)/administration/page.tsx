import { getTranslations, setRequestLocale } from 'next-intl/server'

import Administration from '@/components/Administration/Administration'

import { managementService } from '@/services/management.service'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations('index.meta.administration')

	let imageFromBackend: string | undefined

	try {
		const management = await managementService.getManagement()
		imageFromBackend = management?.data.main_image
	} catch {}

	const fallbackImage = '/meta_image.jpg'
	const image = imageFromBackend || fallbackImage

	const title = t('title')
	const description = t('description')

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [{ url: image, alt: title }]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image]
		}
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
