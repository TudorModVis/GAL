import React from 'react'

import InfoSection from '@/components/CommonComponents/InfoSection'
import NewsContent from '@/components/CommonComponents/NewsContent'
import Donation from '@/components/Donation/Donation'

const page = () => {
	return (
		<main className='bg-sand-50'>
			<InfoSection
				tags={['Antreprenorial', 'Noutate']}
				headerText='ECOMONDO – The Green Technology Expo, cea mai mare expoziție internațională'
				lastActualization='autor: Ludmila Ionuț // 22.10.2023'
				location={['Acasă', 'Noutăți', 'ECOMONDO – The Green Technology']}
				imageSrc='/donation_image.png'
				imageAlt='test'
			/>
			<NewsContent />
			<Donation />
		</main>
	)
}

export default page
