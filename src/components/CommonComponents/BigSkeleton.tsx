import React from 'react'
import ImageIcon from './ImageIcon'

const BigSkeleton = () => {
	return (
		<main className='bg-sand-50 sm:mb-[100vh] h-fit w-screen'>
			<div className='flex flex-col grid-cols-full py-48 animate-pulse'>
				<div className='flex gap-2 mt-24 sm:mt-0'>
					<div className='w-28 h-5.5 bg-gray-500 rounded-2xl'></div>
					<div className='w-16 h-5.5 bg-gray-500 rounded-2xl'></div>
				</div>
				<div className='my-4 w-full sm:w-[70%] h-12 sm:h-24 bg-gray-500 rounded-2xl'></div>
				<div className='h-3.5 w-52 mb-24 bg-gray-500 rounded-2xl'></div>
				<div className='h-0.5 w-full mb-2 bg-gray-500 rounded-2xl'></div>
				<div className='w-1/3 h-4 mb-6 bg-gray-500 rounded-2xl'></div>
				<div className='w-full h-[100vw] sm:h-[640px] bg-gray-500 rounded-2xl flex items-center justify-center mb-20 sm:mb-0'>
					<ImageIcon customStyles='sm:w-[260px] sm:h-[260px] w-32 h-32'/>
				</div>
			</div>
		</main>
	)
}

export default BigSkeleton
