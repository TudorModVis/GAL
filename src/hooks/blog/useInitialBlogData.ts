import { blogService } from "@/services/blog.service"
import { TypeBlogFormState } from "@/types/blog.types"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { UseFormReset } from "react-hook-form"

export function useInitialBlogData(id: string, reset: UseFormReset<TypeBlogFormState>) {

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => blogService.getBlogById(id)
    })

    useEffect(() => {
        if(isSuccess && data){
            reset({
                title: {
                    ro: data.data.title.ro,
                    ru: data.data.title.ru,
                    en: data.data.title.en
                },
                content_type: data.data.content_type,
                categories: data.data.categories,
                authentic_local_category: data.data.authentic_local_category,
                main_image: data.data.main_image,
                summary: {
                    column1: {
                        ro: data.data.summary.column1.ro,
                        ru: data.data.summary.column1.ru,
                        en: data.data.summary.column1.en
                    },
                    column2: data.data.summary.column2 ? {
                        ro: data.data.summary.column2.ro,
                        ru: data.data.summary.column2.ru,
                        en: data.data.summary.column2.en
                    } : undefined,
                },
                sections: data.data.sections.map(section => ({
                    title: {
                        ro: section.title.ro,
                        ru: section.title.ru,
                        en: section.title.en
                    },
                    subsections: section.subsections.map(subsection => ({
                        title: {
                            ro: subsection.title.ro,
                            ru: subsection.title.ru,
                            en: subsection.title.en
                        },
                        column1: {
                            ro: subsection.column1.ro,
                            ru: subsection.column1.ru,
                            en: subsection.column1.en
                        },
                        column2: subsection.column2 ? {
                            ro: subsection.column2.ro,
                            ru: subsection.column2.ru,
                            en: subsection.column2.en
                        } : undefined,
                        images: subsection.images || []
                    }))
                }))
            })
        }
    }, [isSuccess, data, reset])

    return { isLoading }
}