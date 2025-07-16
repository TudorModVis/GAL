import { documentsService } from "@/services/documents.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function useDeleteFiles() {

  const {mutate: deleteFiles, isPending: isDeletePending} = useMutation({
    mutationKey: ['delete files'],
    mutationFn: async (fileUrls: string[]) => documentsService.deleteFiles(fileUrls),
    onSuccess: () => {
        toast.success('Files deleted successfully')
    },
    onError: () => {
        toast.error('Failed to delete files')
    }
  })
  return {deleteFiles, isDeletePending}
}