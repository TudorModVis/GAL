import { blogService } from "@/services/blog.service"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function useDeleteImages() {

  const t = useTranslations("Admin.ToastMessages")

  const {mutate: deleteImages, isPending: isDeletePending} = useMutation({
    mutationKey: ['delete images'],
    mutationFn: async (imageUrls: string[]) => blogService.deleteImages(imageUrls),
    onSuccess: () => {
        toast.success(t('images_deleted'))
    },
    onError: () => {
        toast.error(t('images_deletion_failed'))
    }
  })
  return {deleteImages, isDeletePending}
}