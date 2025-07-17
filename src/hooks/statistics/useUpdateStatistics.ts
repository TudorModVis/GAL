import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { TypeStatisticsFormState } from '@/types/statistics.types'

import { statisticsService } from '@/services/statistics.service'
import { toast } from 'sonner'

export function useUpdateStatistics() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: updateStatistics, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update statistics'],
		mutationFn: (data: TypeStatisticsFormState) => statisticsService.updateStatistics(data),
		onSuccess: () => {
			toast.success(t('statistics_updated'))
			queryClient.invalidateQueries({ queryKey: ['statistics'] })
		},
		onError: () => {
			toast.error(t('statistics_update_failed'))
		}
	})

	return { updateStatistics, isUpdatePending }
}
