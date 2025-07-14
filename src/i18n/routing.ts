import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['ro', 'en', 'ru'],

	pathnames: {
		'/': '/',
		'/news': '/news',
		'/news/[news_id]': '/news/[news_id]',
		'/projects': '/projects',
		'/projects/[projects_id]': '/projects/[projects_id]',
		'/authentic-local': 'authentic-local',
		'/authentic-local/[authentic_local_id]': '/authentic-local/[authentic_local_id]',
		'/contacts': '/contacts',
		'/aboutUs': '/aboutUs',
		'/administration': '/administration',
		'/documents': '/documents',
		'/invalid-path': '/invalid-path',
		'/projects/[projects_name]': '/projects/[projects_name]',
		'/localProducts': '/localProducts',
		'/peopleAndValues': '/peopleAndValues',
		'/touristAttractions': '/touristAttractions',
		'/communityServices': '/communityServices',

		// Admin routes
		'/admin': '/admin',
		'/admin/news': '/admin/news',
		'/admin/projects': '/admin/projects',
		'/admin/login': '/admin/login',
		'/admin/community-services': '/admin/community-services',
		'/admin/local-products': '/admin/local-products',
		'/admin/people-and-values': '/admin/people-and-values',
		'/admin/tourist-attractions': '/admin/tourist-attractions',

		'/admin/create-blog': '/admin/create-blog',
		'/admin/edit-blog/[id]': '/admin/edit-blog/[id]'
	},

	// Used when no locale matches
	defaultLocale: 'ro'
})

export type Pathnames = '/'
