import Image from "next/image";

export function ScreenSizeMessage() {
	return (
		<div className='bg-white max-w-[29.125rem] w-full px-[4rem] pt-[2rem] pb-[3rem] rounded-[1rem] flex flex-col items-center'>
			<Image
				src='/admin_assets/logo-gal-green.svg'
				alt='Logo'
				width={64}
				height={64}
				className='size-[4rem]'
			/>

            <Image
				src='/admin_assets/error-icon.svg'
				alt='Logo'
				width={32}
				height={32}
				className='size-[2rem] mt-[2rem]'
			/>

            <p className="text-[1rem] leaning-[1.125rem] font-[400] font-roboto text-green-700 mt-[1rem] text-center">Unsupported Device</p>
            <p className="text-[1rem] leaning-[1.125rem] font-[400] font-roboto text-green-700 mt-[1rem] text-center">Admin panel access is only available on computer screens.</p>
		</div>
	)
}
