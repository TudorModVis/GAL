import { blogService } from "@/services/blog.service";
import { TypeBlogFormState } from "@/types/blog.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateBlog(id: string) {

    const queryClient = useQueryClient()

    const { mutate: updateBlog, isPending: isUpdatePending } = useMutation({
        mutationKey: ['update blog'],
        mutationFn: (data: TypeBlogFormState) => blogService.updateBlog(id, data),
        onSuccess: () => {
            toast.success('Articolul a fost actualizat cu succes!');
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            queryClient.invalidateQueries({ queryKey: ['blog', id] });
        },
        onError: () => {
            toast.error('A apărut o eroare la actualizarea articolului.');
        },
    })

    return { updateBlog, isUpdatePending }
}