import { useQuery } from '@tanstack/react-query'
import debounce from 'lodash.debounce'
import { useCallback, useState } from 'react'

import { blogService } from '@/services/blog.service'

export function useSearchDebounce() {
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

	const debouncedSetSearch = useCallback(
		debounce((searchTerm: string) => {
			setDebouncedSearchTerm(searchTerm)
		}, 500),
		[]
	)

	const {data, isLoading, refetch, isError, isSuccess} = useQuery({
		queryKey: ['blogs', 'search', debouncedSearchTerm],
		queryFn: () =>
			blogService.getAllBlogs({
				q: debouncedSearchTerm
			}),
		staleTime: 5 * 60 * 1000,
		enabled: !!debouncedSearchTerm.trim()
	})

	const search = useCallback(
		(searchTerm: string) => {
			debouncedSetSearch(searchTerm)
		},
		[debouncedSetSearch]
	)

	return {
        search,
        data,
        isLoading,
        isError,
        isSuccess,
        refetch
    }
}
