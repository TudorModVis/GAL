'use client'

import { Trash2, Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'
import { toast } from 'sonner'

import { ImageToUpload } from '@/types/blog.types'
import { TypeDocumentsFormState } from '@/types/documents.types'

import { DOCUMENTS_FORM } from '@/config/documents-form.config'

import { useGeneratePdfLink } from '@/hooks/documents/useGeneratePdfLink'

import { isImageValid } from '@/lib/file-upload.utils'
import { cn } from '@/lib/utils'
import { ADMIN_DOCUMENTS_TRANSLATE } from '@/constants/admin-documents-translate.data'
import { useTranslations } from 'next-intl'

interface IFileUploadProps {
	name: string
	control: Control<TypeDocumentsFormState>
	rules?: RegisterOptions
	className?: string
	height?: string
	language: 'ro' | 'en' | 'ru'

	addFileToUpload?: (imageUrl: ImageToUpload) => void
	addFileToDelete?: (imageUrl: string) => void
	removeFileFromUpload: (uploadUrl: string) => void

	// For removing the image upload field in the form
	onRemove?: () => void
}

export function FileUpload({
	name,
	language,
	control,
	rules,
	className,
	addFileToUpload,
	addFileToDelete,
	removeFileFromUpload
}: IFileUploadProps) {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [currentUploadUrl, setCurrentUploadUrl] = useState<string>('')
	const { pdfData, isPdfLinkPending, generateLink, isPdfLinkGenerated } = useGeneratePdfLink()

	const {
		field: { value, onChange },
		fieldState
	} = useController({
		name: name as any,
		control: control as any,
		rules: rules as any
	})

	useEffect(() => {
		if (isPdfLinkGenerated && pdfData && selectedFile && value !== pdfData.data.publicUrl) {
			const uploadInfo = {
				file: selectedFile,
				uploadUrl: pdfData.data.uploadUrl
			}

			addFileToUpload?.(uploadInfo)

			onChange(pdfData.data.publicUrl)
		}
	}, [isPdfLinkGenerated, pdfData, selectedFile, onChange, addFileToUpload, value])

	const handleFileUpload = (file: File) => {
		const isValid = isImageValid(
			file,
			DOCUMENTS_FORM.MAX_PDF_FILE_SIZE_IN_MB,
			DOCUMENTS_FORM.ACCEPTED_PDF_FORMATS,
			language
		)
		if (!isValid) return

		setSelectedFile(file)
		generateLink()
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFileUpload(e.target.files[0])
		}
	}

	const hasError = !!fieldState.error

	const hasFile = !!value

	const removeFile = () => {
		onChange('')
		setSelectedFile(null)

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}

		if (currentUploadUrl) {
			removeFileFromUpload?.(currentUploadUrl)
			setCurrentUploadUrl('')
		}

		if (value) {
			addFileToDelete?.(value as string)
		}
	}

	const t = useTranslations("Admin.ToastMessages")

	return (
		<div
			className={cn(
				'w-full hover:opacity-80 relative rounded-[1rem] transition-all duration-300 bg-gray-400 border border-dashed border-gray-500 overflow-hidden flex flex-col items-center justify-center',
				hasError && 'border-error',
				isPdfLinkPending && 'opacity-50',
				className
			)}
		>
			<input
				ref={fileInputRef}
				type='file'
				accept={DOCUMENTS_FORM.ACCEPTED_PDF_FORMATS.join(',')}
				onChange={handleInputChange}
				className={`${hasFile ? 'hidden' : ''} cursor-pointer w-full h-full absolute inset-0 opacity-0 z-10`}
				onError={() => {
					toast.error(t('file_input_error'))
				}}
				disabled={isPdfLinkPending || hasFile}
			/>

			{isPdfLinkPending ? (
				<div className='text-center'>
					<p className='text-gray-600'>
						{language === 'ro'
							? 'Se încarcă documentul...'
							: language === 'en'
								? 'Uploading document...'
								: 'Загрузка документа...'}
					</p>
				</div>
			) : hasFile ? (
				<div className='relative w-full h-full pl-[1.5rem] pr-[3.5rem] flex items-center'>
					{
						selectedFile ? (
							<p className='text-[1rem] text-ellipsis line-clamp-1 leading-[1.125rem] font-[400] text-green-700'>{selectedFile?.name}</p>
						) : (
							<a href={value as string} target='_blank' className='text-[1rem] text-ellipsis line-clamp-1 leading-[1.125rem] font-[400] text-green-700'>
								{value as string}
							</a>
						)
					}

					<Trash2
						onClick={removeFile}
						className={`text-black hover:text-error transition-[colors_opacity] duration-300 absolute z-20 top-1/2 -translate-y-1/2 right-[1.5rem] size-[1.5rem] cursor-pointer hover:opacity-80`}
					/>
				</div>
			) : (
				<div className=''>
					<div className='flex items-center gap-[0.5rem]'>
						<Upload className={`size-[1.25rem] ${hasError ? 'text-error' : 'text-green-700'} `} />
						<p
							className={` text-[1rem] leading-[1.125rem] ${hasError ? 'text-error' : 'text-green-700'}`}
						>
							{ ADMIN_DOCUMENTS_TRANSLATE.fileInput[language].main }
						</p>
					</div>
					<p
						className={`text-[0.75rem] leading-[0.875rem] text-center mt-[0.5rem] ${hasError ? 'text-error' : 'text-green-600'}`}
					>
						{ ADMIN_DOCUMENTS_TRANSLATE.fileInput[language].subtext }: {DOCUMENTS_FORM.MAX_PDF_FILE_SIZE_IN_MB}MB
					</p>
				</div>
			)}
		</div>
	)
}
