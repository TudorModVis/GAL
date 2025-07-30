import { blogService } from '@/services/blog.service'
import { documentsService } from '@/services/documents.service'
import { managementService } from '@/services/management.service'
import { ISearchResult, ResponseTypeEnums } from '@/types/search.types'
import { QueryFunction, QueryKey } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type AnyAxios = AxiosResponse<any, any>

export function queryConfigFor(item: ISearchResult): {
	queryKey: QueryKey
	queryFn: QueryFunction<AnyAxios>
} {
	switch (item.response_type) {
		case ResponseTypeEnums.MANAGEMENT:
			return {
				queryKey: ['management'],
				queryFn: () => managementService.getManagement() as Promise<AnyAxios>
			}
		case ResponseTypeEnums.DOCUMENT:
			return {
				queryKey: ['documents'],
				queryFn: () => documentsService.getDocuments() as Promise<AnyAxios>
			}
		default: {
			const key = ['blog', item._id] as const
			const fn = () => blogService.getBlogById(item._id) as Promise<AnyAxios>
			return { queryKey: key, queryFn: fn }
		}
	}
}
