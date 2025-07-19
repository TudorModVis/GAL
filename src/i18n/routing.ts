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
		'/authentic-local': '/authentic-local',
		'/authentic-local/[authentic_local_id]': '/authentic-local/[authentic_local_id]',
		'/contacts': '/contacts',
		'/aboutUs': '/aboutUs',
		'/administration': '/administration',
		'/documents': '/documents',
		'/invalid-path': '/invalid-path',
		'/projects/[projects_name]': '/projects/[projects_name]',
		'/authentic-local/local-products': '/authentic-local/local-products',
		'/authentic-local/local-products/[local_products_id]': '/authentic-local/local-products/[local_products_id]',
		'/authentic-local/services': '/authentic-local/services',
		'/authentic-local/services/[services_id]': '/authentic-local/services/[services_id]',
		'/authentic-local/tourist-attractions': '/authentic-local/tourist-attractions',
		'/authentic-local/tourist-attractions/[tourist_attractions_id]': '/authentic-local/tourist-attractions/[tourist_attractions_id]',
		'/authentic-local/people-and-values': '/authentic-local/people-and-values',
		'/authentic-local/people-and-values/[people_and_values_id]': '/authentic-local/people-and-values/[people_and_values_id]',
		'/community-services': '/community-services',
		'/community-services/[community_services_id]': '/community-services/[community_services_id]',

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
