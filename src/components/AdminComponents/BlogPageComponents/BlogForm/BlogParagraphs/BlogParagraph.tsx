'use client'

import { Image as Plus } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray } from 'react-hook-form'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { BlogParagraphTitle } from './BlogParagraphTitle'
import { BlogSubparagraph } from './BlogSubparagraph'
import { ErrorMessage } from '@hookform/error-message'

interface Props {
	control: Control<TypeBlogFormState>
	paragraphIndex: number
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeBlogFormState>
	formState: FormState<TypeBlogFormState>
	onRemove: () => void
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void 
}

export function BlogParagraph({
	control,
	paragraphIndex,
	language,
	register,
	formState,
	onRemove,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	const {
		fields: subparagraphFields,
		append: appendSubparagraph,
		remove: removeSubparagraph
	} = useFieldArray({
		control,
		name: `sections.${paragraphIndex}.subsections`
	})

	

	const addSubparagraph = useCallback(() => {
		appendSubparagraph({
			title: { ro: '', ru: '', en: '' },
			column1: { ro: '', ru: '', en: '' },
			column2: { ro: '', ru: '', en: '' }
		})
	}, [appendSubparagraph])

	useEffect(() => {
		if (subparagraphFields.length === 0) {
			addSubparagraph()
		}
	}, [subparagraphFields.length, addSubparagraph])

	

	useEffect(() => {
		register(`sections.${paragraphIndex}.title.ro`, { required: true })
		register(`sections.${paragraphIndex}.title.ru`, { required: true })
		register(`sections.${paragraphIndex}.title.en`, { required: true })
	}, [register, paragraphIndex])

	return (
		<div className='mt-[3rem] relative'>
			<BlogParagraphTitle
				register={register}
				language={language}
				formState={formState}
				index={paragraphIndex}
				onRemove={onRemove}
			/>
			<ErrorMessage
				errors={formState.errors}
				name={`sections.${paragraphIndex}.title`}
				render={() => <p className='text-error text-sm mt-1'>Romanian, Russian and English titles are required</p>}
			/>

			<div>
				<div className='pb-[6rem] border-b border-gray-500'>
					{subparagraphFields.map((subparagraph, subIndex) => (
						<BlogSubparagraph
							key={subparagraph.id}
							control={control}
							paragraphIndex={paragraphIndex}
							language={language}
							register={register}
							formState={formState}
							subIndex={subIndex}
							onRemove={() => removeSubparagraph(subIndex)}
							addImageToUpload={addImageToUpload}
							addImageToDelete={addImageToDelete}
							removeImageFromUpload={removeImageFromUpload}
						/>
					))}
				</div>
				<button
					type='button'
					className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-300 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
					onClick={addSubparagraph}
				>
					<Plus className='text-green-700 size-[1.25rem]' />
					<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
						Adaugă subparagraf
					</span>
				</button>
			</div>
		</div>
	)
}
