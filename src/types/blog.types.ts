import type { IMultiLangText } from './shared/text.types'

export interface IGetParams {
    q?: string
    content_type?: BlogsContentTypeEnum
    category?: BlogsCategoriesEnum
	authentic_local_category?: AuthenticLocalCategoriesEnum
    page?: number
    limit?: number
}

export enum BlogsCategoriesEnum {
	NEWS = 'NEWS',
	ENTERPRENEURSHIP = 'ENTERPRENEURSHIP',
	LOGISTICS = 'LOGISTICS',
	PUBLIC = 'PUBLIC'
}

export enum BlogsContentTypeEnum {
	NEWS = 'NEWS',
	PROJECT = 'PROJECT',
	AUTHENTIC_LOCAL = 'AUTHENTIC_LOCAL'
}

export enum AuthenticLocalCategoriesEnum {
    LOCAL_PRODUCTS = "LOCAL_PRODUCTS",
    SERVICES = "SERVICES",
    TOURIST_ATTRACTIONS = "TOURIST_ATTRACTIONS",
    PEOPLE_AND_VALUES = "PEOPLE_AND_VALUES",
}

export interface ISummary {
	column1: IMultiLangText
	column2?: IMultiLangText
}

export interface ISubSection {
	title: IMultiLangText
	column1: IMultiLangText
	column2?: IMultiLangText
	images?: string[]
}

export interface ISection {
	title: IMultiLangText
	subsections: ISubSection[]
}

// Single Blog interface
export interface IBlogResponse {
	_id: string
	title: IMultiLangText
	content_type: BlogsContentTypeEnum
	categories: BlogsCategoriesEnum[]
	authentic_local_category: AuthenticLocalCategoriesEnum
	main_image: string
	summary: ISummary
	sections: ISection[]
	createdAt: string
	updatedAt: string
}

// Blog list interface
export interface IBlogsResponse {
	blogs: IBlogResponse[]
	pagination: {
		page: number
		limit: number
		total: number
		totalPages: number
		hasNextPage: boolean
		hasPreviousPage: boolean
	}
	filters: {
		searchTerm?: string
		content_type?: BlogsContentTypeEnum
		category?: BlogsCategoriesEnum
	}
}

export interface ImageLinkResponse {
	success: boolean
	imageUrl: string
	key: string
}

// Create / Update Blog type ( ! For React Hook Form )
export type TypeBlogFormState = Partial<Omit<IBlogResponse, '_id' | 'createdAt' | 'updatedAt'>>
