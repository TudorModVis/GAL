import { blogService } from "@/services/blog.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteImages() {
  const {mutate: deleteImages, isPending: isDeletePending} = useMutation({
    mutationKey: ['delete images'],
    mutationFn: async (imageUrls: string[]) => blogService.deleteImages(imageUrls),
    onSuccess: () => {
        toast.success('Images deleted successfully')
    },
    onError: () => {
        toast.error('Failed to delete images')
    }
  })
  return {deleteImages, isDeletePending}
}