import { useQuery } from '@tanstack/react-query'

import { statisticsService } from '@/services/statistics.service'

export function useGetStatistics() {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getStatistics()
	})

    const statistics = data?.data

	return { statistics, isLoading, isError, isSuccess}
}