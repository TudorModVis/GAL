import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { documentsService } from '@/services/documents.service'
import { useTranslations } from 'next-intl'

export function useGeneratePdfLink() {
    const t = useTranslations("Admin.ToastMessages")

    const {
        data : pdfData,
        mutate : generateLink,
        isPending: isPdfLinkPending,
        isSuccess: isPdfLinkGenerated 
    } = useMutation({
        mutationKey: ['generate pdf upload link'],
        mutationFn: () => documentsService.generateUploadLink(),
        onSuccess: () => {
            toast.success(t('file_prepared'))
        },
        onError: () => {
            toast.error(t('file_preparation_failed'))
        }
    })

    return { pdfData, isPdfLinkPending, generateLink, isPdfLinkGenerated }
}
