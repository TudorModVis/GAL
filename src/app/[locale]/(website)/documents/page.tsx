import { getTranslations, setRequestLocale } from 'next-intl/server'

import Documents from '@/components/Documents/Documents'

import { documentsService } from '@/services/documents.service'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations('index.meta.documents')

	let imageFromBackend: string | undefined

	try {
		const management = await documentsService.getDocuments()
		imageFromBackend = management?.data.main_image
	} catch {}

	const fallbackImage = '/documents_image.png'
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

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	return <Documents />
}
