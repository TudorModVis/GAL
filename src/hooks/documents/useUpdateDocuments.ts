import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { TypeDocumentsFormState } from '@/types/documents.types'

import { documentsService } from '@/services/documents.service'

export function useUpdateDocuments() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: updateDocuments, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update documents'],
		mutationFn: (data: TypeDocumentsFormState) => documentsService.updateDocuments(data),
		onSuccess: () => {
			toast.success(t('documents_updated'))
			queryClient.invalidateQueries({ queryKey: ['documents'] })
		},
		onError: () => {
			toast.error(t('documents_update_failed'))
		}
	})

	return { updateDocuments, isUpdatePending }
}
