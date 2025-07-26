'use client'

import { ErrorMessage } from '@hookform/error-message'
import { ImageIcon } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray } from 'react-hook-form'

import { ImageUpload } from '@/components/AdminComponents/ui/ImageUpload/ImageUpload'
import { RichTextEditor } from '@/components/AdminComponents/ui/RichTextEditor/RichTextEditor'
import { TextAreaField } from '@/components/AdminComponents/ui/TextAreaField'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'
import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

interface Props {
	control: Control<TypeBlogFormState>
	paragraphIndex: number
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeBlogFormState>
	formState: FormState<TypeBlogFormState>
	subIndex: number
	onRemove: () => void
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function BlogSubparagraph({
	control,
	paragraphIndex,
	language,
	register,
	formState,
	onRemove,
	subIndex,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	const createColumn2Validator = useCallback(
		(language: 'ro' | 'ru' | 'en') => {
			return (value: string, formValues: TypeBlogFormState) => {
				const column2 = formValues.sections?.[paragraphIndex]?.subsections?.[subIndex]?.column2
				if (!column2) return true

				const { ro, ru, en } = column2
				const hasAnyContent = Boolean(ro?.trim() || ru?.trim() || en?.trim())

				if (hasAnyContent) {
					// Only validate the current language field
					const currentValue = column2[language]
					if (!currentValue?.trim()) {
						const langName =
							language === 'ro' ? 'Romanian' : language === 'ru' ? 'Russian' : 'English'
						return `${langName} text is required when column 2 is used`
					}
				}

				return true
			}
		},
		[paragraphIndex, subIndex]
	)

	useEffect(() => {
		register(`sections.${paragraphIndex}.subsections.${subIndex}.title.ro`, { required: true })
		register(`sections.${paragraphIndex}.subsections.${subIndex}.title.ru`, { required: true })
		register(`sections.${paragraphIndex}.subsections.${subIndex}.title.en`, { required: true })
		register(`sections.${paragraphIndex}.subsections.${subIndex}.column1.ro`, { required: true })
		register(`sections.${paragraphIndex}.subsections.${subIndex}.column1.ru`, { required: true })
		register(`sections.${paragraphIndex}.subsections.${subIndex}.column1.en`, { required: true })

		// register(`sections.${paragraphIndex}.subsections.${subIndex}.images`);

		register(`sections.${paragraphIndex}.subsections.${subIndex}.column2.ro`, {
        validate: createColumn2Validator('ro')
		})
		register(`sections.${paragraphIndex}.subsections.${subIndex}.column2.ru`, {
			validate: createColumn2Validator('ru')
		})
		register(`sections.${paragraphIndex}.subsections.${subIndex}.column2.en`, {
			validate: createColumn2Validator('en')
		})
	}, [register, paragraphIndex, subIndex, createColumn2Validator])

	const {
		fields: imageFields,
		append: appendImage,
		remove: removeImage
	} = useFieldArray({
		control,
		name: `sections.${paragraphIndex}.subsections.${subIndex}.images`
	})

	const addImageField = () => {
		appendImage({ url: '' })
	}

	return (
		<>
			<div className='flex gap-[1.5rem] mt-[3rem] border-t border-gray-500 pt-[0.75rem]'>
				<div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ ADMIN_FORM_TRANSLATE.subparagraphInput[language].label.title }
					</label>

					<TextAreaField
						placeholder={ ADMIN_FORM_TRANSLATE.subparagraphInput[language].placeholder.title }
						className='h-[11rem] placeholder:opacity-70'
						key={`subparagraph-title-${language}`}
						{...register(`sections.${paragraphIndex}.subsections.${subIndex}.title.${language}`, {
							required: true
						})}
						hasError={!!formState.errors.sections?.[paragraphIndex]?.subsections?.[subIndex]?.title}
					/>
					<ErrorMessage
						errors={formState.errors}
						name={`sections.${paragraphIndex}.subsections.${subIndex}.title`}
						render={() => (
							<p className='text-error text-sm'>
								{ ADMIN_FORM_TRANSLATE.subparagraphInput[language].error.title }
							</p>
						)}
					/>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ ADMIN_FORM_TRANSLATE.subparagraphInput[language].label.col1_title }
					</label>
					<RichTextEditor
						key={`summary-col1-${language}`}
						control={control}
						name={`sections.${paragraphIndex}.subsections.${subIndex}.column1.${language}`}
						placeholder={ ADMIN_FORM_TRANSLATE.subparagraphInput[language].placeholder.col1_placeholder }
						rules={{
							required: true
						}}
						className={`${formState.errors.sections?.[paragraphIndex]?.subsections?.[subIndex]?.column1 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name={`sections.${paragraphIndex}.subsections.${subIndex}.column1`}
						render={() => (
							<p className='text-error text-sm'>
								{ ADMIN_FORM_TRANSLATE.subparagraphInput[language].error.col1_error }
							</p>
						)}
					/>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ ADMIN_FORM_TRANSLATE.subparagraphInput[language].label.col2_title }
					</label>
					<RichTextEditor
						key={`summary-col2-${language}`}
						control={control}
						name={`sections.${paragraphIndex}.subsections.${subIndex}.column2.${language}`}
						placeholder={ ADMIN_FORM_TRANSLATE.subparagraphInput[language].placeholder.col2_placeholder }
						className={`${formState.errors.sections?.[paragraphIndex]?.subsections?.[subIndex]?.column2 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name={`sections.${paragraphIndex}.subsections.${subIndex}.column2`}
						render={() => (
							<p className='text-error text-sm'>{ ADMIN_FORM_TRANSLATE.subparagraphInput[language].error.col2_error }</p>
						)}
					/>
				</div>

				<p
					className='text-[0.875rem] ml-auto text-error cursor-pointer hover:opacity-70 transition-opacity duration-300'
					onClick={onRemove}
				>
					{ADMIN_FORM_TRANSLATE.addingElements[language].remove}
				</p>
			</div>

			<div className='mt-[2rem]'>
				{imageFields.map((imageField, imageIndex) => (
					<div
						key={imageField.id}
						className='relative mt-[0.5rem]'
					>
						<ImageUpload
							language={language}
							name={
								`sections.${paragraphIndex}.subsections.${subIndex}.images.${imageIndex}.url` as any
							}
							control={control}
							height='6rem'
							className='rounded-[1rem]'
							addImageToUpload={addImageToUpload}
							addImageToDelete={addImageToDelete}
							removeImageFromUpload={removeImageFromUpload}
							onRemove={() => removeImage(imageIndex)}
							rules={{
								required: true
							}}
						/>
					</div>
				))}
				<ErrorMessage
					errors={formState.errors}
					name={`sections.${paragraphIndex}.subsections.${subIndex}.images`}
					render={() => (
						<p className='text-error text-sm mt-1'>
							{ ADMIN_FORM_TRANSLATE.addingElements[language].removeImage }
						</p>
					)}
				/>

				<button
					type='button'
					className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-300 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
					onClick={addImageField}
				>
					<ImageIcon className='text-green-700 size-[1.125rem]' />
					<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
						{ ADMIN_FORM_TRANSLATE.addingElements[language].addImage }
					</span>
				</button>
			</div>
		</>
	)
}
