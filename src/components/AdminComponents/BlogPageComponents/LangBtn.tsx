interface ILangBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isActive: boolean
}

export function LangBtn({ text, isActive, ...props }: ILangBtnProps) {
	return (
		<button
			{...props}
			className={`px-[2rem] text-[1rem] leading-[1.125rem] cursor-pointer h-[1.625rem] flex items-center justify-center rounded-[0.25rem] ${isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-green-700'} font-[400] transition-colors duration-300`}
		>
			{text}
		</button>
	)
}
