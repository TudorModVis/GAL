import React from 'react'

const BigPostSkeleton = () => {
	return (
		<div
			data-nosnippet
			aria-hidden='true'
			className='sm:col-span-6 col-span-full w-full sm:h-150 h-100 pr-4 sm:pr-0'
		>
			<div className='bg-stone-400 flex items-center justify-center w-full sm:h-1/2 h-2/5 rounded-t-2xl animate-pulse'></div>
			<div className='flex flex-col px-4 sm:px-6 sm:pt-6 pb-4 sm:py-8!'>
				<div className='flex justify-between my-4'>
					<div className='sm:flex hidden gap-2'>
						<div className='h-5.5 w-20 bg-stone-400 rounded-sm animate-pulse'></div>
						<div className='h-5.5 w-20 bg-stone-400 rounded-sm animate-pulse'></div>
					</div>
					<div className='h-5.5 w-30 bg-stone-400 rounded-sm animate-pulse sm:block hidden'></div>
				</div>
				<div className='w-full bg-stone-400 rounded-sm h-10 mb-3 animate-pulse'></div>
				<div className='w-full bg-stone-400 rounded-sm h-12 mb-4 animate-pulse'></div>
				<div className='flex gap-1'>
					<div className='sm:w-1/4 w-1/2 h-11 bg-stone-400 rounded-full mb-6 animate-pulse'></div>
					<div className='bg-stone-400 rounded-full size-11 animate-pulse'></div>
				</div>
			</div>
		</div>
	)
}

export default BigPostSkeleton
