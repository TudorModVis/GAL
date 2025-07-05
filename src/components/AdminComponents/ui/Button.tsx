import React from 'react'

import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(
				'cursor-pointer font-manrope h-[3rem] rounded-[1.5rem] bg-green-500 hover:bg-green-600 transition-colors duration-300 w-full text-white font-bold',
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
