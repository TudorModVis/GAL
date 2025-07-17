import { ErrorMessage } from '@hookform/error-message'
import { useCallback, useEffect } from 'react'
import { Control, FormState } from 'react-hook-form'

import { TypeManagementFormState } from '@/types/management.types'

import { MANAGEMENT_FORM } from '@/config/management-form.config'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'
import { ADMIN_MANAGEMENT_TRANSLATE } from '@/constants/admin-management-translate.data'

interface IAdministrationInput {
    language: 'ro' | 'ru' | 'en'
    control: Control<TypeManagementFormState>
    formState: FormState<TypeManagementFormState>
}

export function AdministrationInput({ language, control, formState }: IAdministrationInput) {
    const administrationPaths = MANAGEMENT_FORM.getAdministrationPaths(language)

    const createColumn2Validator = useCallback((language: 'ro' | 'ru' | 'en') => {
        return (value: string, formValues: TypeManagementFormState) => {
            const column2 = formValues.administration?.column2
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
        control.register('administration.column1.ro', { required: true })
        control.register('administration.column1.ru', { required: true })
        control.register('administration.column1.en', { required: true })

        control.register('administration.column2.ro', {
            validate: createColumn2Validator('ro')
        })
        control.register('administration.column2.ru', {
            validate: createColumn2Validator('ru')
        })
        control.register('administration.column2.en', {
            validate: createColumn2Validator('en')
        })
    }, [control, administrationPaths, createColumn2Validator])

    return (
        <>
            <div className='flex gap-[1.5rem] mt-[3rem] border-t border-gray-500 pt-[0.75rem]'>
                <div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem]'>
                    <label className='font-bold text-green-700 max-w-[80%] text-[1rem] leading-[1.125rem]'>
                        { ADMIN_MANAGEMENT_TRANSLATE.administrationInput.title[language] }
                    </label>
                </div>

                <div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
                    <label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
                        { ADMIN_MANAGEMENT_TRANSLATE.administrationInput.column1Input[language].label }
                    </label>
                    <RichTextEditor
                        key={`administration-col1-${language}`}
                        control={control}
                        name={administrationPaths.column1}
                        placeholder={ADMIN_MANAGEMENT_TRANSLATE.administrationInput.column1Input[language].placeholder}
                        rules={{
                            required: true
                        }}
                        className={`${formState.errors.administration?.column1 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
                    />
                    <ErrorMessage
                        errors={formState.errors}
                        name='administration.column1'
                        render={() => (
                            <p className='text-error text-sm'>
                                { ADMIN_MANAGEMENT_TRANSLATE.administrationInput.column1Input[language].error }
                            </p>
                        )}
                    />
                </div>

                <div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
                    <label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
                        { ADMIN_MANAGEMENT_TRANSLATE.administrationInput.column2Input[language].label }
                    </label>
                    <RichTextEditor
                        key={`administration-col2-${language}`}
                        control={control}
                        name={administrationPaths.column2}
                        placeholder={ADMIN_MANAGEMENT_TRANSLATE.administrationInput.column2Input[language].placeholder}
                        className={`${formState.errors.administration?.column2 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
                    />
                    <ErrorMessage
                        errors={formState.errors}
                        name='administration.column2'
                        render={() => (
                            <p className='text-error text-sm'>
                                { ADMIN_MANAGEMENT_TRANSLATE.administrationInput.column2Input[language].error }
                            </p>
                        )}
                    />
                </div>
            </div>
        </>
    )
}
