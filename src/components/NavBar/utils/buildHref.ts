import { AuthenticLocalCategoriesEnum, BlogsContentTypeEnum } from '@/types/blog.types'
import { ISearchResult, ResponseTypeEnums } from '@/types/search.types'

import { Link } from '@/i18n/navigation'

export type LinkHref = Parameters<typeof Link>[0]['href']

export const buildHref = (item: ISearchResult): LinkHref => {
	if (item.response_type === ResponseTypeEnums.MANAGEMENT) {
		return '/administration'
	}
	if (item.response_type === ResponseTypeEnums.DOCUMENT) {
		return '/documents'
	}

	switch (item.content_type) {
		case BlogsContentTypeEnum.NEWS:
			return { pathname: '/news/[news_id]', params: { news_id: item._id } }

		case BlogsContentTypeEnum.PROJECT:
			return {
				pathname: '/projects/[projects_id]',
				params: { projects_id: item._id }
			}

		case BlogsContentTypeEnum.AUTHENTIC_LOCAL:
			switch (item.authentic_local_category) {
				case AuthenticLocalCategoriesEnum.LOCAL_PRODUCTS:
					return {
						pathname: '/authentic-local/local-products/[local_products_id]',
						params: { local_products_id: item._id }
					}

				case AuthenticLocalCategoriesEnum.SERVICES:
					return {
						pathname: '/authentic-local/services/[services_id]',
						params: { services_id: item._id }
					}

				case AuthenticLocalCategoriesEnum.TOURIST_ATTRACTIONS:
					return {
						pathname: '/authentic-local/tourist-attractions/[tourist_attractions_id]',
						params: { tourist_attractions_id: item._id }
					}

				case AuthenticLocalCategoriesEnum.PEOPLE_AND_VALUES:
					return {
						pathname: '/authentic-local/people-and-values/[people_and_values_id]',
						params: { people_and_values_id: item._id }
					}

				default:
					return '/authentic-local'
			}

		default:
			return '/'
	}
}
