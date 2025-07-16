import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { Control, FormState } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeManagementFormState } from '@/types/management.types'

import { MANAGEMENT_FORM } from '@/config/management-form.config'

import { ImageUpload } from '../../ui/ImageUpload/ImageUpload'
import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'
import { ADMIN_MANAGEMENT_TRANSLATE } from '@/constants/admin-management-translate.data'

interface IPresidentInput {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeManagementFormState>
	formState: FormState<TypeManagementFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function PresidentInput({ language, control, formState, addImageToUpload, addImageToDelete, removeImageFromUpload }: IPresidentInput) {
	const presidentTextPaths = MANAGEMENT_FORM.getPresidentPaths(language)

	useEffect(() => {
		control.register('president.text.ro', { required: true })
		control.register('president.text.ru', { required: true })
		control.register('president.text.en', { required: true })
	}, [control])

	return (
		<>
			<div className='flex gap-[1.5rem] mt-[3rem] border-t border-gray-500 pt-[0.75rem]'>
				<div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_MANAGEMENT_TRANSLATE.presidentInput.title[language]}
					</label>
				</div>

				<div className='flex relative flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_MANAGEMENT_TRANSLATE.presidentInput.paragraphInput[language].label}
					</label>
					<RichTextEditor
						key={`president-text-${language}`}
						control={control}
						name={presidentTextPaths.text}
						placeholder={ADMIN_MANAGEMENT_TRANSLATE.presidentInput.paragraphInput[language].placeholder}
						rules={{
							required: true
						}}
						className={`${formState.errors.president?.text ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name='.column1'
						render={() => <p className='text-error text-sm absolute bottom-0 left-0 translate-y-[calc(100%+0.25rem)]'>{ADMIN_MANAGEMENT_TRANSLATE.presidentInput.paragraphInput[language].error}</p>}
					/>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>{ADMIN_MANAGEMENT_TRANSLATE.presidentInput.imageInput[language].label}</label>
					<ImageUpload
						control={control}
						name={'president.image' as keyof TypeManagementFormState}
						rules={{ required: true }}
						language={language}
						addImageToUpload={addImageToUpload}
						addImageToDelete={addImageToDelete}
						removeImageFromUpload={removeImageFromUpload}
                        className='!h-full rounded-[0.5rem] bg-gray-300'
					/>
					<ErrorMessage
						errors={formState.errors}
						name='president.image'
						render={() => (
							<p className='text-error text-sm'>
								{ADMIN_MANAGEMENT_TRANSLATE.presidentInput.imageInput[language].error}
							</p>
						)}
					/>
				</div>
			</div>
		</>
	)
}
