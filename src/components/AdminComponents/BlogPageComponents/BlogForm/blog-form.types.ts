import { UseFormRegister } from 'react-hook-form'

import { TypeBlogFormState } from '@/types/blog.types'

export interface IBlogForm {
	register: UseFormRegister<TypeBlogFormState>
	language: 'ro' | 'ru' | 'en'
}
