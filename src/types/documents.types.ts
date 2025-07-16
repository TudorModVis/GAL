import { IMultiLangText } from './shared/text.types'

export interface IRegulations {
	text: IMultiLangText
	file: string
}

export interface IStatuses {
	text: IMultiLangText
	file: string
}

export interface IStrategies {
	text: IMultiLangText
	file: string
}

export interface IAgreements {
	text: IMultiLangText
	file: string
}

export interface IReports {
	text: IMultiLangText
	file: string
}

export interface IDocumentsResponse {
	_id: string
	main_image: string
	regulations: IRegulations[]
	statuses: IStatuses[]
	strategies: IStrategies[]
	agreements: IAgreements[]
	reports: IReports[]
	createdAt: string
	updatedAt: string
}

export interface IFileLinkResponse {
	success: boolean
	uploadUrl: string
	publicUrl: string
	key: string
}

export interface IFileToUpload {
	uploadUrl: string
	file: File
}

export type TypeDocumentsFormState = Partial<Omit<IDocumentsResponse, '_id' | 'createdAt' | 'updatedAt'>>
