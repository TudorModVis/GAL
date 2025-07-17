import { useQuery } from '@tanstack/react-query'

import { documentsService } from '@/services/documents.service'

export function useGetDocuments() {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['documents'],
		queryFn: () => documentsService.getDocuments()
	})

	const documents = data?.data

	return { documents, isLoading, isError, isSuccess }
}
