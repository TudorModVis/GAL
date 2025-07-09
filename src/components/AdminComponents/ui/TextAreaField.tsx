import { cn } from "@/lib/utils"
import { forwardRef } from "react"


interface IFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, IFieldProps>(
    ({ className, hasError, ...props }, ref) => {

        return (
            <textarea
                ref={ref}
                className={cn(
                    `font-roboto styled-scrollbar resize-none p-[1.5rem] transition-colors bg-gray-300 duration-300 h-[3rem] w-full px-[1.5rem] outline-none border border-gray-500 rounded-[0.5rem] text-[1rem] leading-[1.125rem] text-green-700 placeholder:text-green-700 ${hasError && 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake'}`,
                    className
                )}
                {...props}
            />
        )
    }
)

TextAreaField.displayName = 'TextAreaField'