import { Control } from 'react-hook-form'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { ImageUpload } from '../../ui/ImageUpload/ImageUpload'

interface IStatisticsMainImageProps {
    language: 'ro' | 'ru' | 'en'
    control: Control<TypeBlogFormState>
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
                    Image title
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
