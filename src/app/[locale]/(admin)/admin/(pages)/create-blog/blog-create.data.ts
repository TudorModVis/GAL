import { TypeBlogFormState } from '@/types/blog.types'

export const formDefaultValues: TypeBlogFormState = {
    title: {
        ro: '',
        ru: '',
        en: ''
    },
    content_type: undefined,
    categories: [],
    authentic_local_category: undefined,
    main_image: '',
    summary: {
        column1: {
            ro: '',
            ru: '',
            en: ''
        },
        column2: {
            ro: '',
            ru: '',
            en: ''
        }
    },
    sections: [
        {
            title: {
                ro: '',
                ru: '',
                en: ''
            },
            subsections: [
                {
                    title: {
                        ro: '',
                        ru: '',
                        en: ''
                    },
                    column1: {
                        ro: '',
                        ru: '',
                        en: ''
                    },
                    column2: {
                        ro: '',
                        ru: '',
                        en: ''
                    },
                    images: []
                }
            ]
        }
    ]
}