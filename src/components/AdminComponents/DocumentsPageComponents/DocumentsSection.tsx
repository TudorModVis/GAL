'use client'

import { Plus } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Control, FormState, useFieldArray } from 'react-hook-form'

import { IFileToUpload, TypeDocumentsFormState } from '@/types/documents.types'

import { DocumentsSectionInput } from './DocumentsSectionInput'
import { ADMIN_DOCUMENTS_TRANSLATE } from '@/constants/admin-documents-translate.data'

interface Props {
	name: keyof Omit<TypeDocumentsFormState, 'main_image'>
	title: string
	control: Control<TypeDocumentsFormState>
	formState: FormState<TypeDocumentsFormState>
	language: 'ro' | 'ru' | 'en'
	addFileToUpload: (file: IFileToUpload) => void
	addFileToDelete: (fileUrl: string) => void
	removeFileFromUpload: (uploadUrl: string) => void
}

export function DocumentsSection({
	name,
	title,
	control,
	formState,
	language,
	addFileToUpload,
	addFileToDelete,
	removeFileFromUpload
}: Props) {
	const {
		fields: sectionFields,
		append: appendField,
		remove: removeField
	} = useFieldArray({
		control,
		name: name
	})

	const addDocument = useCallback(() => {
		appendField({
			text: { ro: '', ru: '', en: '' },
			file: ''
		})
	}, [appendField])

	useEffect(() => {
		if (sectionFields.length === 0) {
			addDocument()
		}
	}, [sectionFields.length, addDocument])

	return (
		<div className='flex gap-[1.5rem] mt-[6rem] border-t border-gray-500 pt-[0.75rem]'>
			<div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem] '>
				<label className='font-bold flex justify-between items-center text-green-700 max-w-[80%] text-[1rem] leading-[1.125rem]'>
					{title}
				</label>
			</div>

			<div className='grid grid-cols-2 max-w-[59.5rem] gap-[1.5rem] flex-1'>
				<div className='flex items-center'>
					<div
						onClick={() => addDocument()}
						className='bg-gray-300 hover:opacity-80 transition-opacity duration-300 cursor-pointer mb-[3rem] h-[22rem] w-full rounded-[0.5rem] border border-dashed border-gray-500 flex items-center justify-center gap-[0.5rem]'
					>
						<Plus className='text-green-700 size-[1.25rem]' />
						<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
							 { ADMIN_DOCUMENTS_TRANSLATE.documentInput[language].addButton }
						</span>
					</div>
				</div>
				{sectionFields.map((field, index) => (
					<DocumentsSectionInput
						key={field.id}
						index={index}
						control={control}
						formState={formState}
						language={language}
						name={name}
						onRemove={() => {
							if (sectionFields.length <= 1) return
							removeField(index)
						}}
						addFileToUpload={addFileToUpload}
						addFileToDelete={addFileToDelete}
						removeFileFromUpload={removeFileFromUpload}
					/>
				))}
			</div>
		</div>
	)
}
