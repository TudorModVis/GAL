import { Control } from 'react-hook-form'
import type { IBlogForm } from './blog-form.types'
import { AuthenticLocalCategoriesEnum, TypeBlogFormState } from '@/types/blog.types'
import { SelectBox } from '../../ui/SelectBox/SelectBox'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register'| 'watch'> {
    control: Control<TypeBlogFormState>
}

export function AuthenticLocalCategoryInput({ language, control }: IBlogContentTypeInput) {
    console.log(language)
    return (
        <>
            <div className='flex justify-between items-center mt-[3rem]'>
                <label
                    className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
                >
                    Authentic local category
                </label>
            </div>

            <SelectBox
                options={Object.values(AuthenticLocalCategoriesEnum)}
                name='authentic_local_category'
                control={control}
                placeholder='Select authentic local category...'
                className='bg-gray-300 mt-[0.5rem] font-bold'
                rules={{
                    required: true
                }}
            />
        </>
    )
}
