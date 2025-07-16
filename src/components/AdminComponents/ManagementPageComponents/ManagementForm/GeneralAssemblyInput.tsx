import { ErrorMessage } from '@hookform/error-message'
import { useCallback, useEffect } from 'react'
import { Control, FormState } from 'react-hook-form'

import { TypeManagementFormState } from '@/types/management.types'

import { MANAGEMENT_FORM } from '@/config/management-form.config'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'
import { ADMIN_MANAGEMENT_TRANSLATE } from '@/constants/admin-management-translate.data'

interface IGeneralAssemblyInput {
    language: 'ro' | 'ru' | 'en'
    control: Control<TypeManagementFormState>
    formState: FormState<TypeManagementFormState>
}

export function GeneralAssemblyInput({ language, control, formState }: IGeneralAssemblyInput) {
    const generalAssemblyPaths = MANAGEMENT_FORM.getGeneralAssemblyPaths(language)

    const createColumn2Validator = useCallback((language: 'ro' | 'ru' | 'en') => {
        return (value: string, formValues: TypeManagementFormState) => {
            const column2 = formValues.general_assembly?.column2
            if (!column2) return true

            const { ro, ru, en } = column2
            const hasAnyContent = Boolean(ro?.trim() || ru?.trim() || en?.trim())

            if (hasAnyContent) {
                const currentValue = column2[language]
                if (!currentValue?.trim()) {
                    const langName =
                        language === 'ro' ? 'Romanian' : language === 'ru' ? 'Russian' : 'English'
                    return `${langName} text is required when column 2 is used`
                }
            }

            return true
        }
    }, [])

    useEffect(() => {
        control.register('general_assembly.column1.ro', { required: true })
        control.register('general_assembly.column1.ru', { required: true })
        control.register('general_assembly.column1.en', { required: true })

        control.register('general_assembly.column2.ro', {
            validate: createColumn2Validator('ro')
        })
        control.register('general_assembly.column2.ru', {
            validate: createColumn2Validator('ru')
        })
        control.register('general_assembly.column2.en', {
            validate: createColumn2Validator('en')
        })
    }, [control, generalAssemblyPaths, createColumn2Validator])

    return (
        <>
            <div className='flex gap-[1.5rem] mt-[3rem] border-t border-gray-500 pt-[0.75rem]'>
                <div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem]'>
                    <label className='font-bold text-green-700 max-w-[80%] text-[1rem] leading-[1.125rem]'>
                        { ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.title[language] }
                    </label>
                </div>

                <div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
                    <label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
                        { ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.column1Input[language].label }
                    </label>
                    <RichTextEditor
                        key={`general-assembly-col1-${language}`}
                        control={control}
                        name={generalAssemblyPaths.column1}
                        placeholder={ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.column1Input[language].placeholder}
                        rules={{
                            required: true
                        }}
                        className={`${formState.errors.general_assembly?.column1 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
                    />
                    <ErrorMessage
                        errors={formState.errors}
                        name='general_assembly.column1'
                        render={() => (
                            <p className='text-error text-sm'>
                                {ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.column1Input[language].error}
                            </p>
                        )}
                    />
                </div>

                <div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
                    <label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
                        {ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.column2Input[language].label}
                    </label>
                    <RichTextEditor
                        key={`general-assembly-col2-${language}`}
                        control={control}
                        name={generalAssemblyPaths.column2}
                        placeholder={ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.column2Input[language].placeholder}
                        className={`${formState.errors.general_assembly?.column2 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
                    />
                    <ErrorMessage
                        errors={formState.errors}
                        name='general_assembly.column2'
                        render={() => (
                            <p className='text-error text-sm'>
                                {ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyInput.column2Input[language].error}
                            </p>
                        )}
                    />
                </div>
            </div>
        </>
    )
}
