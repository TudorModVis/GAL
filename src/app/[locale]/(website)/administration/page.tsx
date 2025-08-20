import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import Administration from '@/components/Administration/Administration'

import { managementService } from '@/services/management.service'

type ManagementResponse = {
	main_image: string
	updatedAt: string
	president: { text: any; image?: string }
	executive: { column1: any }
	general_assembly: { column1: any; column2?: any }
	administration: { column1: any }
	committee: { column1: any; column2?: any }
	censorship: { column1: any }
}

const toAbsolute = (url?: string) => {
	if (!url) return undefined
	if (/^https?:\/\//i.test(url)) return url
	const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? ''
	const path = url.startsWith('/') ? url : `/${url}`
	return base ? `${base}${path}` : undefined
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params

	const t = await getTranslations({
		locale,
		namespace: 'index.meta.administration'
	})

	let mainImageAbs: string | undefined
	try {
		const res = await managementService.getManagement()
		const data = res?.data as ManagementResponse | undefined
		mainImageAbs = toAbsolute(data?.main_image)
	} catch {
		// ignore; metadata still returns without images
	}

	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			images: mainImageAbs ? [{ url: mainImageAbs }] : undefined
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: mainImageAbs ? [mainImageAbs] : undefined
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
