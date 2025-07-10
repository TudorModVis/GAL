import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { blogService } from '@/services/blog.service'
import { useTranslations } from 'next-intl'

export function useGenerateImageLink() {

	const t = useTranslations('Admin.ToastMessages')

	const {
		data : imageData,
		mutate : generateLink,
		isPending: isImageLinkPending,
		isSuccess: isImageLinkGenerated
	} = useMutation({
		mutationKey: ['generate upload link'],
		mutationFn: () => blogService.generateUploadLink(),
		onSuccess: () => {
			toast.success(t('image_prepared'))
		},
		onError: () => {
			toast.error(t('image_preparation_failed'))
		}
	})

	return { imageData, isImageLinkPending, generateLink, isImageLinkGenerated }
}
