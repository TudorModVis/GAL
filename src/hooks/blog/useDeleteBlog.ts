import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { blogService } from '@/services/blog.service'

export function useDeleteBlog() {
	const queryClient = useQueryClient()

	const { mutate: deleteBlog, isPending: isBlogDeletePending } = useMutation({
		mutationKey: ['delete blog'],
		mutationFn: (id: string) => blogService.deleteBlog(id),
		onSuccess: () => {
			toast.success('Articolul a fost șters cu succes!')
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
		},
		onError: () => {
			toast.error('A apărut o eroare la ștergerea articolului.')
		}
	})
	return { deleteBlog, isBlogDeletePending }
}
