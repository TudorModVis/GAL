import React from 'react'

const SmallPostSkeleton = () => {
	return (
		<div
			className='grid col-span-4 pointer select-none pr-4 sm:pr-0'
			data-nosnippet
			aria-hidden='true'
		>
			<div className='bg-sand-50 my-3 custom-shadow relative flex h-[483px] sm:h-[500px] flex-col rounded-2xl overflow-hidden cursor-pointer group'>
				<div className='bg-stone-400 h-1/3 sm:h-1/2 relative w-full animate-pulse'></div>
				<div className='px-4 animate-pulse'>
					<div className='h-5 w-full bg-stone-400 mt-6 mb-4 rounded-full'></div>
					<div className='h-5 w-3/4 bg-stone-400 rounded-full'></div>
				</div>
				<div className='px-4 pb-4 mt-auto animate-pulse'>
					<div className='flex w-full justify-between items-center'>
						<div className='bg-stone-400 w-40 h-10 rounded-full'></div>
						<div className='size-10 bg-stone-400 rounded-full'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SmallPostSkeleton
