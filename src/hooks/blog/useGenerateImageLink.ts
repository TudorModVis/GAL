import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { blogService } from '@/services/blog.service'

export function useGenerateImageLink() {
	const {
		data : imageData,
		mutate : generateLink,
		isPending: isImageLinkPending,
		isSuccess: isImageLinkGenerated
	} = useMutation({
		mutationKey: ['generate upload link'],
		mutationFn: () => blogService.generateUploadLink(),
		onSuccess: () => {
			toast.success('Image prepared for upload')
		},
		onError: () => {
			toast.error('Failed to prepare image for upload')
		}
	})

	return { imageData, isImageLinkPending, generateLink, isImageLinkGenerated }
}
