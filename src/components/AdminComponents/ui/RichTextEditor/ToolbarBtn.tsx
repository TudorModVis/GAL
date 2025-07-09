import { LucideIcon } from 'lucide-react'

interface Props {
	Icon: LucideIcon
	onClick?: () => void
    isActive: boolean
}

export function ToolbarBtn({ Icon, onClick, isActive }: Props) {
	return (
		<div
			className={`cursor-pointer size-[2rem] flex items-center justify-center bg-gray-300 rounded-[0.5rem] transition-colors duration-300 ${isActive ? 'bg-gray-500' : 'hover:bg-gray-400'}`}
			onClick={onClick}
		>
			<Icon className='size-[1rem]'/>
		</div>
	)
}
