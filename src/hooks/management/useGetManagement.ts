import { useQuery } from '@tanstack/react-query'

import { managementService } from '@/services/management.service'

export function useGetManagement() {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['management'],
		queryFn: () => managementService.getManagement()
	})

    const management = data?.data

	return { management, isLoading, isError, isSuccess}
}
