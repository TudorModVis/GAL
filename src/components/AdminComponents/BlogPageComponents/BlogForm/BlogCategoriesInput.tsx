import { Control } from 'react-hook-form'
import type { IBlogForm } from './blog-form.types'
import { BlogsCategoriesEnum, TypeBlogFormState } from '@/types/blog.types'
import { MultiSelectBox } from '../../ui/SelectBox/MultiSelectBox'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register'| 'watch'> {
    control: Control<TypeBlogFormState>
}

export function BlogCategoriesInput({ language, control }: IBlogContentTypeInput) {
    console.log(language)
    return (
        <>
            <div className='flex justify-between items-center mt-[3rem]'>
                <label
                    className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
                >
                    Categoriile articolului
                </label>
            </div>

            <MultiSelectBox
                options={Object.values(BlogsCategoriesEnum)}
                name='categories'
                control={control}
                placeholder='Categoriile articolului...'
                className='bg-gray-300 mt-[0.5rem] font-bold'
                rules={{
                    required: true
                }}
            />
        </>
    )
}
