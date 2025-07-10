import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { blogService } from '@/services/blog.service'
import { useTranslations } from 'next-intl'

export function useDeleteBlog() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: deleteBlog, isPending: isBlogDeletePending } = useMutation({
		mutationKey: ['delete blog'],
		mutationFn: (id: string) => blogService.deleteBlog(id),
		onSuccess: () => {
			toast.success(t('article_deleted'))
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
		},
		onError: () => {
			toast.error(t('article_deletion_failed'))
		}
	})
	return { deleteBlog, isBlogDeletePending }
}
