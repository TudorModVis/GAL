import { Control } from 'react-hook-form'
import type { IBlogForm } from './blog-form.types'
import { BlogsContentTypeEnum, TypeBlogFormState } from '@/types/blog.types'
import { SelectBox } from '../../ui/SelectBox/SelectBox'
import { ADMIN_FORM_TRANSLATE, FORM_CONTENT_TYPE_TRANSLATE } from '@/constants/admin-form-translate.data'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register'| 'watch'> {
    control: Control<TypeBlogFormState>
}

export function BlogContentTypeInput({ language, control }: IBlogContentTypeInput) {

	const translatedOptions = Object.values(BlogsContentTypeEnum).map(enumValue => ({
        value: enumValue,
        label: FORM_CONTENT_TYPE_TRANSLATE[enumValue][language]
    }))
 
	return (
		<>
			<div className='flex justify-between items-center mt-[3rem]'>
				<label
					className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
				>
					{ ADMIN_FORM_TRANSLATE.contentTypeInput[language].label }
				</label>
			</div>

            <SelectBox
                options={translatedOptions}
                name='content_type'
                control={control}
                placeholder={ ADMIN_FORM_TRANSLATE.contentTypeInput[language].placeholder }
                className='bg-gray-300 mt-[0.5rem] font-bold'
				rules={{
					required: true
				}}
            />
		</>
	)
}
