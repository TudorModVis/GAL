import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { ADMIN_PAGE_HEADERS } from '@/constants/admin-sidebar.constants'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { usePathname } from '@/i18n/navigation'
import { blogService } from '@/services/blog.service'
import { useParams } from 'next/navigation'

export function usePageTitle() {
	const pathname = usePathname()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
    const params = useParams()

	let pageTitle = ''
	let pageSlug = ''

	const isEditBlogPage = pathname.includes(ADMIN_PAGES.EDIT_BLOG)
	const id = isEditBlogPage ? params.id as string : ""
	const { data: blogData, isLoading: isSlugLoading } = useQuery({
		queryKey: ['blog', id],
		queryFn: () => blogService.getBlogById(id),
		enabled: isEditBlogPage && !!id
	})

	if (pathname.includes(ADMIN_PAGES.NEWS)) {
		pageTitle = ADMIN_PAGE_HEADERS.newsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.newsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.PROJECTS)) {
		pageTitle = ADMIN_PAGE_HEADERS.projectsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.projectsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.ADMINISTRATION)) {
		pageTitle = ADMIN_PAGE_HEADERS.administrationPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.administrationPage.slug[locale]
	} else if (pathname.includes(ADMIN_PAGES.DOCUMENTS)) {
		pageTitle = ADMIN_PAGE_HEADERS.documentsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.documentsPage.slug[locale]
	} else if (pathname.includes(ADMIN_PAGES.LOCAL_PRODUCTS)) {
		pageTitle = ADMIN_PAGE_HEADERS.localProductsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.localProductsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.COMMUNITY_SERVICES)) {
		pageTitle = ADMIN_PAGE_HEADERS.communityServicesPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.communityServicesPage.slug
	} else if (pathname.includes(ADMIN_PAGES.TOURIST_ATTRACTIONS)) {
		pageTitle = ADMIN_PAGE_HEADERS.touristAttractionsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.touristAttractionsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.PEOPLE_AND_VALUES)) {
		pageTitle = ADMIN_PAGE_HEADERS.peopleAndValuesPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.peopleAndValuesPage.slug
	} else if (pathname.includes(ADMIN_PAGES.CREATE_BLOG)) {
		pageTitle = ADMIN_PAGE_HEADERS.createBlogPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.createBlogPage.slug
	} else if (pathname.includes(ADMIN_PAGES.EDIT_BLOG)) {
		pageTitle = ADMIN_PAGE_HEADERS.editBlogPage.title[locale]
		pageSlug = blogData?.data.title[locale] || ADMIN_PAGE_HEADERS.editBlogPage.slug
	} else if (pathname.includes(ADMIN_PAGES.STATISTICS)) {
		pageTitle = ADMIN_PAGE_HEADERS.statisticsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.statisticsPage.slug[locale]
	}

	return {
		pageTitle,
		pageSlug,
        isSlugLoading
	}
}
