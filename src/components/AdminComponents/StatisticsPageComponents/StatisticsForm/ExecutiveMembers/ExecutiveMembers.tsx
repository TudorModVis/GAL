import { Control, FormState, UseFormRegister, useFieldArray } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'
import { ExecutiveMemeber } from './ExecutiveMemeber'
import { ADMIN_STATISTICS_TRANSLATE } from '@/constants/admin-statistics-translate.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeStatisticsFormState>
	formState: FormState<TypeStatisticsFormState>
	control: Control<TypeStatisticsFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function ExecutiveMembers({
	language,
	register,
	formState,
	control,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	const { fields } = useFieldArray({
		control,
		name: 'executive_members'
	})

	// const addMember = useCallback(() => {
	// 	append({
	// 		image: '',
	// 		name: { ro: '', ru: '', en: '' },
	// 		position: { ro: '', ru: '', en: '' }
	// 	}, { shouldFocus: false })
	// }, [append])

	return (
		<div className='mt-[6rem]'>
			<h1 className='font-bold text-[3rem] leading-[3.25rem]'>{ ADMIN_STATISTICS_TRANSLATE.executiveMembersTitle[language] }</h1>

            <div className='mt-[3rem] grid gap-[1.5rem] grid-cols-4'>
                {/* <button onClick={addMember} type='button' className='bg-gray-300 min-h-[39rem] h-full cursor-pointer rounded-[1rem] flex items-center justify-center gap-[0.25rem] hover:opacity-70 transition-opacity duration-300 border border-dashed border-gray-500'>
                    <Plus className='text-green-700 size-[1.125rem]' />
                    <h2 className='text-[1rem] font-[500] text-green-700 text-center'>
                        { ADMIN_STATISTICS_TRANSLATE.addMember[language] }
                    </h2>
                </button> */}

                {
                    fields.map((field, index) => (
                        <ExecutiveMemeber
                            key={field.id + '-' + field.image}
                            language={language}
                            register={register}
                            formState={formState}
                            control={control}
                            addImageToUpload={addImageToUpload}
                            addImageToDelete={addImageToDelete}
                            removeImageFromUpload={removeImageFromUpload}
                            // onRemove={() => remove(index)}
                            index={index}
                        />
                    ))
                }
            </div>
		</div>
	)
}
