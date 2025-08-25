'use client'

import L from 'leaflet'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

// import MarkerClusterGroup from 'react-leaflet-markercluster'

import MapPlaceholder from './MapPlaceholder'

import 'leaflet/dist/leaflet.css'

L.Icon.Default.mergeOptions({
	shadowUrl: '/markerShadow.png',
	iconRetinaUrl: '/markerIcon2x.svg',
	iconUrl: '/markerIcon.svg'
})

const Map = () => {
	const tMap = useTranslations('aboutUs.map')

	const markerData = [
		{
			position: [46.658, 28.844],
			name: tMap('marker_sagaidac.name'),
			population: tMap('marker_sagaidac.population'),
			location: tMap('marker_sagaidac.location'),
			phone: tMap('marker_sagaidac.phone'),
			mail: tMap('marker_sagaidac.mail'),
			image: '/sagaidac_image.jpg'
		},
		{
			position: [46.629, 28.875],
			name: tMap('marker_suric.name'),
			population: tMap('marker_suric.population'),
			location: tMap('marker_suric.location'),
			phone: tMap('marker_suric.phone'),
			mail: tMap('marker_suric.mail'),
			image: '/suric_image.jpg'
		},
		{
			position: [46.612, 28.906],
			name: tMap('marker_satulnou.name'),
			population: tMap('marker_satulnou.population'),
			location: tMap('marker_satulnou.location'),
			phone: tMap('marker_satulnou.phone'),
			mail: tMap('marker_satulnou.mail'),
			image: '/satulNou_image.jpg'
		},
		{
			position: [46.691, 28.812],
			name: tMap('marker_porumbrei.name'),
			population: tMap('marker_porumbrei.population'),
			location: tMap('marker_porumbrei.location'),
			phone: tMap('marker_porumbrei.phone'),
			mail: tMap('marker_porumbrei.mail'),
			image: '/porumbrei_image.jpg'
		},
		{
			position: [46.676, 28.884],
			name: tMap('marker_codreni.name'),
			population: tMap('marker_codreni.population'),
			location: tMap('marker_codreni.location'),
			phone: tMap('marker_codreni.phone'),
			mail: tMap('marker_codreni.mail'),
			image: '/codreni_image.jpg'
		},
		{
			position: [46.577, 28.925],
			name: tMap('marker_selemet.name'),
			population: tMap('marker_selemet.population'),
			location: tMap('marker_selemet.location'),
			phone: tMap('marker_selemet.phone'),
			mail: tMap('marker_selemet.mail'),
			image: '/selemet_image.jpg'
		},
		{
			position: [46.557, 28.93],
			name: tMap('marker_mihailovca.name'),
			population: tMap('marker_mihailovca.population'),
			location: tMap('marker_mihailovca.location'),
			phone: tMap('marker_mihailovca.phone'),
			mail: tMap('marker_mihailovca.mail'),
			image: '/mihailovca_image.jpg'
		},
		{
			position: [46.578, 28.996],
			name: tMap('marker_batir.name'),
			population: tMap('marker_batir.population'),
			location: tMap('marker_batir.location'),
			phone: tMap('marker_batir.phone'),
			mail: tMap('marker_batir.mail'),
			image: '/batir_image.jpg'
		},
		{
			position: [46.567, 29.118],
			name: tMap('marker_taraclia.name'),
			population: tMap('marker_taraclia.population'),
			location: tMap('marker_taraclia.location'),
			phone: tMap('marker_taraclia.phone'),
			mail: tMap('marker_taraclia.mail'),
			image: '/taraclia_image.jpg'
		},
		{
			position: [46.633, 29.008],
			name: tMap('marker_ciuflesti.name'),
			population: tMap('marker_ciuflesti.population'),
			location: tMap('marker_ciuflesti.location'),
			phone: tMap('marker_ciuflesti.phone'),
			mail: tMap('marker_ciuflesti.mail'),
			image: '/ciuflesti_image.jpg'
		},
		{
			position: [46.581, 28.749],
			name: tMap('marker_ecaterinovca.name'),
			population: tMap('marker_ecaterinovca.population'),
			location: tMap('marker_ecaterinovca.location'),
			phone: tMap('marker_ecaterinovca.phone'),
			mail: tMap('marker_ecaterinovca.mail'),
			image: '/ecaterinovca_image.jpg'
		}
	]

	return (
		<MapContainer
			center={[46.579, 28.925]}
			zoom={11}
			placeholder={<MapPlaceholder />}
			style={{ height: '100%', width: '100%', zIndex: 0 }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			{markerData.map((marker, idx) => (
				<Marker
					key={`${idx}`}
					position={marker.position as [number, number]}
				>
					<Popup className='popup-309'>
						<div className='w-full h-full text-xs font-[Onest] [&>p]:m-0! flex flex-col gap-2'>
							<p>
								<b>{tMap('name')}</b> {marker.name}
							</p>
							<p>
								<b>{tMap('population')}</b> {marker.population}
							</p>
							<p>
								<b>{tMap('location')}</b> {marker.location}
							</p>
							<p>
								<b>{tMap('phone')}</b> {marker.phone}
							</p>
							<p className='pb-2'>
								<b>{tMap('mail')}</b> {marker.mail}
							</p>
							<Image
								alt='popup'
								src={marker.image}
								width={400}
								height={400}
								style={{
									width: '100%',
									height: 'auto',
									borderRadius: '8px',
									aspectRatio: '16/9',
									objectFit: 'cover',
									objectPosition: 'center'
								}}
							/>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	)
}

export default Map
