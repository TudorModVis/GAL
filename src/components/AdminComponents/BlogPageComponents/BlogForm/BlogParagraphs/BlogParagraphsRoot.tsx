'use client'

import { Plus } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray } from 'react-hook-form'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { BlogParagraph } from './BlogParagraph'
import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

interface Props {
	register: UseFormRegister<TypeBlogFormState>
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeBlogFormState>
	formState: FormState<TypeBlogFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function BlogParagraphsRoot({
	register,
	language,
	control,
	formState,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'sections'
	})

	const addParagraph = useCallback(() => {
		append({
			title: { ro: '', ru: '', en: '' },
			subsections: [
				{
					title: { ro: '', ru: '', en: '' },
					column1: { ro: '', ru: '', en: '' },
					column2: { ro: '', ru: '', en: '' }
				}
			]
		}, { shouldFocus: false })
	}, [append])

	useEffect(() => {
		if (fields.length === 0) {
			addParagraph()
		}
	}, [fields.length, addParagraph])

	return (
		<div>
			{fields.map((paragraph, paragraphIndex) => (
				<BlogParagraph
					key={paragraph.id}
					register={register}
					control={control}
					formState={formState}
					paragraphIndex={paragraphIndex}
					language={language}
					onRemove={() => remove(paragraphIndex)}
					addImageToUpload={addImageToUpload}
					addImageToDelete={addImageToDelete}
					removeImageFromUpload={removeImageFromUpload}
				/>
			))}

			<button
				type='button'
				className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
				onClick={addParagraph}
			>
				<Plus className='text-green-700 size-[1.25rem]' />
				<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
					{ ADMIN_FORM_TRANSLATE.addingElements[language].addParagraph }
				</span>
			</button>
		</div>
	)
}
