import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeBlogFormState } from '@/types/blog.types'

import { blogService } from '@/services/blog.service'
import { useTranslations } from 'next-intl'

export function useCreateBlog() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: createBlog, isPending: isCreatePending } = useMutation({
		mutationKey: ['create blog'],
		mutationFn: (data: TypeBlogFormState) => blogService.createBlog(data),
		onSuccess: () => {
			toast.success(t('article_created'))
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
		},
        onError: () => {
            toast.error(t('article_creation_failed'))
        }
	})

	return { createBlog, isCreatePending }
}
