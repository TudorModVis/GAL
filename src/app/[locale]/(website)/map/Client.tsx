'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import MapPlaceholder from '@/components/ListAndStatistics/MapPlaceholder'

const Map = dynamic(() => import('@/components/ListAndStatistics/Map'), {
	ssr: false,
	loading: () => (
		<div className='h-screen w-full grid place-items-center text-sm text-gray-500'>
			<MapPlaceholder />
		</div>
	)
})

const Client = () => {
	return <Map />
}

export default Client
