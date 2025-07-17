import { AuthenticLocalCategoriesEnum, BlogsContentTypeEnum } from "./blog.types"

export enum ResponseTypeEnums {
	BLOG = 'BLOG',
	DOCUMENT = 'DOCUMENT',
	MANAGEMENT = 'MANAGEMENT'
}

export interface SearchStats {
  total_blogs: number
  total_blogs_news: number
  total_blogs_project: number
  total_blogs_authentic_local: number
}

export interface ISearchResult {
	_id: string
	title: {
		ro: string
		ru: string
		en: string
	}
	content_type: BlogsContentTypeEnum.AUTHENTIC_LOCAL | BlogsContentTypeEnum.NEWS | BlogsContentTypeEnum.PROJECT
	authentic_local_category: AuthenticLocalCategoriesEnum.LOCAL_PRODUCTS | AuthenticLocalCategoriesEnum.SERVICES | AuthenticLocalCategoriesEnum.TOURIST_ATTRACTIONS | AuthenticLocalCategoriesEnum.PEOPLE_AND_VALUES
	response_type: ResponseTypeEnums.DOCUMENT | ResponseTypeEnums.BLOG | ResponseTypeEnums.MANAGEMENT
}

export interface ISearchResponse {
    results: ISearchResult[]
    stats: SearchStats
}
