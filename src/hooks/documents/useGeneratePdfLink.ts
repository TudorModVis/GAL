import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { documentsService } from '@/services/documents.service'

export function useGeneratePdfLink() {

    const {
        data : pdfData,
        mutate : generateLink,
        isPending: isPdfLinkPending,
        isSuccess: isPdfLinkGenerated
    } = useMutation({
        mutationKey: ['generate pdf upload link'],
        mutationFn: () => documentsService.generateUploadLink(),
        onSuccess: () => {
            toast.success('PDF link generated successfully')
        },
        onError: () => {
            toast.error('Failed to generate PDF link')
        }
    })

    return { pdfData, isPdfLinkPending, generateLink, isPdfLinkGenerated }
}
