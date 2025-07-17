'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { Control, FormState } from 'react-hook-form'

import { IFileToUpload, TypeDocumentsFormState } from '@/types/documents.types'

import { DOCUMENTS_FORM } from '@/config/documents-form.config'

import { FileUpload } from '../ui/FileUpload/FileUpload'
import { RichTextEditor } from '../ui/RichTextEditor/RichTextEditor'
import { ADMIN_DOCUMENTS_TRANSLATE } from '@/constants/admin-documents-translate.data'

interface Props {
	control: Control<TypeDocumentsFormState>
	formState: FormState<TypeDocumentsFormState>
	name: keyof Omit<TypeDocumentsFormState, 'main_image'>
	language: 'ro' | 'ru' | 'en'
	index: number
	onRemove: () => void
	addFileToUpload: (file: IFileToUpload) => void
	addFileToDelete: (fileUrl: string) => void
	removeFileFromUpload: (uploadUrl: string) => void
}

export function DocumentsSectionInput({
	control,
	formState,
	language,
	name,
	index,
	onRemove,
	addFileToUpload,
	addFileToDelete,
	removeFileFromUpload
}: Props) {
	const getFieldPaths = DOCUMENTS_FORM.getSectionPaths(language, name, index)

	useEffect(() => {
		control.register(`${name}.${index}.text.ro`, { required: true })
		control.register(`${name}.${index}.text.ru`, { required: true })
		control.register(`${name}.${index}.text.en`, { required: true })
	}, [control, index, name])

	return (
		<div className='flex flex-col flex-1 gap-[0.5rem]'>
			<label className='font-bold flex justify-between items-center text-green-700 text-[1rem] leading-[1.125rem]'>
				<span>{ ADMIN_DOCUMENTS_TRANSLATE.documentInput[language].label }</span>
				<span
					className='text-[0.875rem] text-error cursor-pointer hover:opacity-70 font-[400] transition-opacity duration-300'
					onClick={onRemove}
				>
					{ ADMIN_DOCUMENTS_TRANSLATE.documentInput[language].remove }
				</span>
			</label>
			<RichTextEditor
				key={`executive-col1-${language}`}
				control={control}
				name={getFieldPaths.text}
				placeholder={ADMIN_DOCUMENTS_TRANSLATE.documentInput[language].placeholder}
				rules={{
					required: true
				}}
				className={`${formState.errors[name]?.[index]?.text ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
			/>
			<ErrorMessage
				errors={formState.errors}
				name={`${name}.${index}.text`}
				render={() => <p className='text-error text-sm mt-1'>{ADMIN_DOCUMENTS_TRANSLATE.documentInput[language].error}</p>}
			/>

			<FileUpload
				name={`${name}.${index}.file`}
				control={control}
				language={language}
				addFileToUpload={addFileToUpload}
				removeFileFromUpload={removeFileFromUpload}
				className='bg-gray-300 rounded-[0.5rem] h-[6rem] mt-[1rem]'
				addFileToDelete={addFileToDelete}
			/>

			<ErrorMessage
				errors={formState.errors}
				name={`${name}.${index}.file`}
				render={() => <p className='text-error text-sm mt-1'>{ADMIN_DOCUMENTS_TRANSLATE.fileInput[language].error}</p>}
			/>
		</div>
	)
}
