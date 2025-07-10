import { blogService } from "@/services/blog.service";
import { TypeBlogFormState } from "@/types/blog.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useUpdateBlog(id: string) {

    const t = useTranslations('Admin.ToastMessages')
    const queryClient = useQueryClient()

    const { mutate: updateBlog, isPending: isUpdatePending } = useMutation({
        mutationKey: ['update blog'],
        mutationFn: (data: TypeBlogFormState) => blogService.updateBlog(id, data),
        onSuccess: () => {
            toast.success(t('article_updated'));
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            queryClient.invalidateQueries({ queryKey: ['blog', id] });
        },
        onError: () => {
            toast.error(t('article_update_failed'));
        },
    })

    return { updateBlog, isUpdatePending }
}