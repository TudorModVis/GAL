import React from 'react'

const AuthenticHeaderSkeleton: React.FC = () => (
	<section className='w-screen h-fit grid grid-cols-donation relative pt-24 mb-40 animate-pulse'>
		<div className='col-span-11 mt-24 w-full h-[64vh] rounded-2xl bg-stone-400' />

		<div className='col-span-12 col-start-13 mt-24 flex flex-col'>
			<div className='w-full h-px bg-stone-400 mb-2' />
			<div className='flex flex-col justify-between h-full'>
				<div className='flex items-center gap-1 w-full mb-6'>
					<div className='h-4 w-24 bg-stone-400 rounded-2xl' />
					<div className='h-4 w-4 bg-stone-400 rounded-2xl shrink-0' />
					<div className='h-4 w-16 bg-stone-400 rounded-2xl' />
					<div className='h-4 w-4 bg-stone-400 rounded-2xl shrink-0' />
					<div className='h-4 w-20 bg-stone-400 rounded-2xl' />
					<div className='h-4 w-4 bg-stone-400 rounded-2xl shrink-0' />
					<div className='h-4 w-40 bg-stone-400 rounded-2xl' />
				</div>
				<div>
					<div className='flex gap-2 mb-4'>
						<div className='h-5 w-20 bg-stone-400 rounded-full' />
						<div className='h-5 w-16 bg-stone-400 rounded-full' />
						<div className='h-5 w-14 bg-stone-400 rounded-full' />
					</div>

					<div className='space-y-3'>
						<div className='h-9 w-full bg-stone-400 rounded-2xl' />
						<div className='h-9 w-11/12 bg-stone-400 rounded-2xl' />
						<div className='h-9 w-4/5 bg-stone-400 rounded-2xl' />
						<div className='h-3 w-1/3 bg-stone-400 rounded-2xl' />
					</div>
				</div>
			</div>
		</div>
	</section>
)

export default AuthenticHeaderSkeleton
