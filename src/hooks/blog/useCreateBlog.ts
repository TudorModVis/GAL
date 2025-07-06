import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeBlogFormState } from '@/types/blog.types'

import { blogService } from '@/services/blog.service'

export function useCreateBlog() {
	const queryClient = useQueryClient()

	const { mutate: createBlog, isPending: isCreatePending } = useMutation({
		mutationKey: ['create blog'],
		mutationFn: (data: TypeBlogFormState) => blogService.createBlog(data),
		onSuccess: () => {
			toast.success('Articolul a fost creat cu succes!')
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
		},
        onError: () => {
            toast.error('A apărut o eroare la crearea articolului.')
        }
	})

	return { createBlog, isCreatePending }
}
