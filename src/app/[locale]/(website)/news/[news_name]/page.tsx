import { getTranslations, setRequestLocale } from 'next-intl/server'

import ClientPart from './ClientPart'
import { blogService } from '@/services/blog.service'

export type Locale = 'ro' | 'ru' | 'en'

function htmlToPlainText(html?: string): string {
	if (!html) return ''
	const withoutTags = html.replace(/<[^>]*>/g, ' ')
	const decoded = withoutTags
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
	return decoded.replace(/\s+/g, ' ').trim()
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: Locale; id: string }>
}) {
	const { locale, id } = await params
	setRequestLocale(locale)
	const t = await getTranslations('index.meta.test')

	let blog: any | null = null

	try {
		const res = await blogService.getBlogById(id)
		blog = (res && (res.data ?? res)) || null
	} catch {}

	const fallbackImage = '/videoPoster.jpg'

	const title: string = blog?.title?.[locale] ?? blog?.title?.en ?? t?.('title') ?? 'Blog Post'

	const descriptionFromBackendHtml: string | undefined =
		blog?.summary?.column1?.[locale] ?? blog?.summary?.column1?.en

	const description: string =
		htmlToPlainText(descriptionFromBackendHtml) || t?.('description') || ''

	const image: string = blog?.main_image || fallbackImage

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

export default async function Projects() {
	return <ClientPart />
}
