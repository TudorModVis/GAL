import { InputField } from "@/components/AdminComponents/ui/InputField"
import { TypeStatisticsFormState } from "@/types/statistics.types"
import { ErrorMessage } from "@hookform/error-message"
import { FormState, UseFormRegister } from "react-hook-form"

interface Props {
    register: UseFormRegister<TypeStatisticsFormState>
    title: string
    name: string,
    formState: FormState<TypeStatisticsFormState>
    placeholder: string
    error: string
}

export function StatisticItem({register, title, name, formState, placeholder, error}: Props) {
    const hasError = formState.errors[name as keyof TypeStatisticsFormState]

    return (
        <div className="h-[11rem] flex flex-col justify-between">
            <label className="text-[1rem] font-[400] leading-[1.125rem]" htmlFor={name}>{title}</label>
            <div className="relative">
                <InputField
                    id={name}
                    hasError={!!hasError}
                    placeholder={placeholder}
                    className={`bg-gray-300 mt-[0.5rem] font-bold placeholder:opacity-70`}
                    {...register(name as keyof TypeStatisticsFormState, {
                        minLength: 1,
                        required: true
                    })}
                />
                <ErrorMessage
                    errors={formState.errors}
                    name={name as keyof TypeStatisticsFormState}
                    render={() => <p className='text-error text-sm absolute bottom-0 left-0 translate-y-[calc(100%+0.25rem)]'>{error}</p>}
                />
            </div>
        </div>
    )
}
