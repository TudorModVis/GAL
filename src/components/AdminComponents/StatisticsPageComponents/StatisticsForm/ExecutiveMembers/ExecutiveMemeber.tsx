import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ImageUpload } from '@/components/AdminComponents/ui/ImageUpload/ImageUpload'

import { ImageToUpload } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'
import { NameInput } from './NameInput'
import { X } from 'lucide-react'
import { PositionInput } from './PositionInput'
import { ErrorMessage } from '@hookform/error-message'
import { ADMIN_STATISTICS_TRANSLATE } from '@/constants/admin-statistics-translate.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeStatisticsFormState>
	formState: FormState<TypeStatisticsFormState>
	control: Control<TypeStatisticsFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
	onRemove: () => void
	index: number
}

export function ExecutiveMemeber({
	language,
	register,
	formState,
	control,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload,
	onRemove,
	index
}: Props) {
	return (
		<div className='relative group'>

            <div className='absolute top-[1.5rem] left-[1.5rem] z-[80] size-[1.25rem] cursor-pointer hover:opacity-70 transition-opacity duration-300' onClick={onRemove} >
				<X className='text-black'/>
			</div>


			<ImageUpload
				name={`executive_members.${index}.image` as any}
                height='26.625rem'
				className='min-h-[26.625rem] max-h-[26.625rem]'
				language={language}
				rules={{ required: true }}
				control={control}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>

            <NameInput
                register={register}
                language={language}
                formState={formState}
                index={index}
            />

			<ErrorMessage
				errors={formState.errors}
				name={`executive_members.${index}.name`}
				render={() => (
					<p className='mt-1 text-error text-sm'>{ ADMIN_STATISTICS_TRANSLATE.executiveMembersNameInput[language].error }</p>
				)}
			/>

            <PositionInput
                register={register}
                language={language}
                formState={formState}
                index={index}
            />

			<ErrorMessage
				errors={formState.errors}
				name={`executive_members.${index}.position`}
				render={() => (
					<p className='mt-1 text-error text-sm'>{ ADMIN_STATISTICS_TRANSLATE.executiveMemberPositionInput[language].error }</p>
				)}
			/>
		</div>
	)
}
