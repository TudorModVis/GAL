import { documentsService } from "@/services/documents.service"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function useDeleteFiles() {

  const t = useTranslations("Admin.ToastMessages")

  const {mutate: deleteFiles, isPending: isFilesDeletePending} = useMutation({
    mutationKey: ['delete files'],
    mutationFn: async (fileUrls: string[]) => documentsService.deleteFiles(fileUrls),
    onSuccess: () => {
        toast.success(t('files_deleted'))
    },
    onError: () => {
        toast.error(t('files_deletion_failed'))
    }
  })
  return {deleteFiles, isFilesDeletePending}
}