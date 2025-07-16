interface Props {
    text: string,
    color: string
}

export function ManagementTag({ text, color }: Props) {

    return (
        <div
            className={`h-[1.5rem] rounded-[0.25rem] px-[1rem] flex items-center justify-center ${color}`}
        >
            <p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white'>{text}</p>
        </div>
    )
}
