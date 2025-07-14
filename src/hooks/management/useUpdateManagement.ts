import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { TypeManagementFormState } from '@/types/management.types'

import { managementService } from '@/services/management.service'

export function useUpdateManagement() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: updateManagement, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update management'],
		mutationFn: (data: TypeManagementFormState) => managementService.updateManagement(data),
		onSuccess: () => {
			toast.success(t('management_updated'))
			queryClient.invalidateQueries({ queryKey: ['management'] })
		},
		onError: () => {
			toast.error('Failed to update management')
		}
	})

	return { updateManagement, isUpdatePending }
}
