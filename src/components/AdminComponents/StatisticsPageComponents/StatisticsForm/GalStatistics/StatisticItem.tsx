import { InputField } from "@/components/AdminComponents/ui/InputField"
import { TypeStatisticsFormState } from "@/types/statistics.types"
import { FormState, UseFormRegister } from "react-hook-form"

interface Props {
    register: UseFormRegister<TypeStatisticsFormState>
    title: string
    name: string,
    formState: FormState<TypeStatisticsFormState>
}

export function StatisticItem({register, title, name, formState}: Props) {
    const hasError = formState.errors[name as keyof TypeStatisticsFormState]

    return (
        <div className="h-[11rem] flex flex-col justify-between">
            <label className="text-[1rem] font-[400] leading-[1.125rem]" htmlFor={name}>{title}</label>
            <InputField
                id={name}
                hasError={!!hasError}
                placeholder="Placeholder"
                className={`bg-gray-300 mt-[0.5rem] font-bold placeholder:opacity-70`}
                {...register(name as keyof TypeStatisticsFormState, {
                    minLength: 1,
                    required: true
                })}
            />
        </div>
    )
}
