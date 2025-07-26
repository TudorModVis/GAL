import React from 'react'

import ImageIcon from './ImageIcon'

const AuthenticSkeleton = () => {
	return (
		<main className='bg-sand-50 sm:mb-[100vh] h-fit w-screen'>
			<div className='flex gap-16 py-48 animate-pulse grid-cols-donation w-full h-screen'>
				<div className='w-200 aspect-square bg-gray-500 rounded-2xl flex items-center justify-center'>
					<ImageIcon customStyles='sm:w-[260px] sm:h-[260px] w-32 h-32' />
				</div>
				<div className='w-full flex flex-col justify-between'>
					<div>
						<div className='h-[1px] bg-gray-500 w-full'></div>
						<div className='h-4.5 bg-gray-500 w-full mt-3 rounded-2xl'></div>
						<div className='h-4.5 bg-gray-500 w-1/2 mt-3 rounded-2xl'></div>
					</div>
					<div>
						<div className='flex gap-2 mb-4'>
							<div className='h-5.5 w-24 bg-gray-500 rounded-2xl'></div>
							<div className='h-5.5 w-16 bg-gray-500 rounded-2xl'></div>
						</div>
						<div className='w-full h-9 bg-gray-500 rounded-2xl'></div>
						<div className='w-full h-9 bg-gray-500 mt-4 rounded-2xl'></div>
						<div className='w-1/2 h-9 bg-gray-500 mt-4 rounded-2xl'></div>
						<div className='w-36 h-3 bg-gray-500 mt-4 rounded-2xl'></div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default AuthenticSkeleton
