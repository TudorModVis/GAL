import { Control } from 'react-hook-form'
import type { IBlogForm } from './blog-form.types'
import { BlogsContentTypeEnum, TypeBlogFormState } from '@/types/blog.types'
import { SelectBox } from '../../ui/SelectBox/SelectBox'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register'| 'watch'> {
    control: Control<TypeBlogFormState>
}

export function BlogContentTypeInput({ language, control }: IBlogContentTypeInput) {
    console.log(language)
	return (
		<>
			<div className='flex justify-between items-center mt-[3rem]'>
				<label
					className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
				>
					Tip de conținut
				</label>
			</div>

            <SelectBox
                options={Object.values(BlogsContentTypeEnum)}
                name='content_type'
                control={control}
                placeholder='Select content type...'
                className='bg-gray-300 mt-[0.5rem] font-bold'
				rules={{
					required: true
				}}
            />
		</>
	)
}
