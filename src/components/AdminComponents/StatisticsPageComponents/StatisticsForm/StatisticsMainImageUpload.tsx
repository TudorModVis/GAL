import { Control } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'

import { ImageUpload } from '../../ui/ImageUpload/ImageUpload'
import { ADMIN_STATISTICS_TRANSLATE } from '@/constants/admin-statistics-translate.data'
import { TypeStatisticsFormState } from '@/types/statistics.types'

interface IStatisticsMainImageProps {
    language: 'ro' | 'ru' | 'en'
    control: Control<TypeStatisticsFormState>
    addImageToUpload: (image: ImageToUpload) => void
    addImageToDelete: (imageUrl: string) => void
    removeImageFromUpload: (uploadUrl: string) => void
}

export function StatisticsMainImageUpload({
    language,
    control,
    addImageToUpload,
    addImageToDelete,
    removeImageFromUpload
}: IStatisticsMainImageProps) {
    return (
        <>
            <div className='flex justify-between items-center mt-[3rem]'>
                <label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
                    {ADMIN_STATISTICS_TRANSLATE.mainImageInput[language].label}
                </label>
            </div>

            <ImageUpload
                language={language}
                name='image'
                control={control}
                className='mt-[0.5rem]'
                addImageToUpload={addImageToUpload}
                addImageToDelete={addImageToDelete}
                removeImageFromUpload={removeImageFromUpload}
                rules={{
                    required: true
                }}
            />
        </>
    )
}
