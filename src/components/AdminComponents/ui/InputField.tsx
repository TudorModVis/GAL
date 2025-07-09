import { cn } from "@/lib/utils"
import { forwardRef } from "react"


interface IFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
}

export const InputField = forwardRef<HTMLInputElement, IFieldProps>(
    ({ className, type = 'text', hasError, ...props }, ref) => {

        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    `font-roboto transition-colors duration-300 h-[3rem] w-full px-[1.5rem] outline-none border border-gray-500 rounded-[0.5rem] text-[1rem] leading-[1.125rem] text-green-700 placeholder:text-green-700 ${hasError && 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake'}`,
                    className
                )}
                {...props}
            />
        )
    }
)

InputField.displayName = 'InputField'