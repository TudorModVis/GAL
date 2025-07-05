import { IMultiLangText } from '@/types/shared/text.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

export interface IMultiLanguageText {
	ro: string
	ru: string
	en: string
}

export interface ISidebarItem {
	title: IMultiLanguageText
	link: string
}

export interface IAdminSidebarSubsection {
	title: IMultiLangText
	items: ISidebarItem[]
}

export const ADMIN_SIDEBAR_ITEMS: IAdminSidebarSubsection[] = [
	{
		title: {
			ro: 'Activități',
			ru: 'Деятельность',
			en: 'Activities'
		},
		items: [
			{
				title: {
					ro: 'Noutăți',
					ru: 'Новости',
					en: 'News'
				},
				link: ADMIN_PAGES.NEWS
			},
			{
				title: {
					ro: 'Proiecte',
					ru: 'Проекты',
					en: 'Projects'
				},
				link: ADMIN_PAGES.PROJECTS
			}
		]
	},
	{
		title: {
			ro: 'Despre GAL',
			ru: 'О GAL',
			en: 'About GAL'
		},
		items: [
			{
				title: {
					ro: 'Conducerea GAL',
					ru: 'Руководство GAL',
					en: 'GAL Management'
				},
				link: ADMIN_PAGES.ADMINISTRATION
			},
			{
				title: {
					ro: 'Documente Oficiale',
					ru: 'Официальные документы',
					en: 'Official Documents'
				},
				link: ADMIN_PAGES.DOCUMENTS
			}
		]
	},
	{
		title: {
			ro: 'Autentic Local',
			ru: 'Аутентичный локальный',
			en: 'Authentic Local'
		},
		items: [
			{
				title: {
					ro: 'Produse Locale',
					ru: 'Местные Продукты',
					en: 'Local Products'
				},
				link: ADMIN_PAGES.LOCAL_PRODUCTS
			},
			{
				title: {
					ro: 'Servicii din Comunitate',
					ru: 'Услуги сообщества',
					en: 'Community Services'
				},
				link: ADMIN_PAGES.COMMUNITY_SERVICES
			},
			{
				title: {
					ro: 'Atracții Turistice',
					ru: 'Туристические достопримечательности',
					en: 'Tourist Attractions'
				},
				link: ADMIN_PAGES.TOURIST_ATTRACTIONS
			},
			{
				title: {
					ro: 'Oameni și Valori',
					ru: 'Люди и Ценности',
					en: 'People and Values'
				},
				link: ADMIN_PAGES.PEOPLE_AND_VALUES
			}
		]
	}
]
