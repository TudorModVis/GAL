'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import Arrow from '../CommonComponents/Arrow'

const ScrollToBottom = () => {
	const tDonation = useTranslations('index.Donation')
	const handleScrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth'
		})
	}
	return (
		<button
			onClick={handleScrollToBottom}
			className={`flex gap-1 mx-auto w-full items-center group/link cursor-pointer
                     [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4
                     [&>div]:text-forest-900 [&>div]:bg-sand-50
                     [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full
                     [&>div:nth-child(2)]:p-3.5`}
		>
			<div className='transition text-nowrap'>{tDonation('contact_button_text')}</div>
			<div className='flex items-center justify-center transition'>
				<Arrow arrowCustomStyle='group-hover/link:rotate-0 -rotate-45 fill-forest-900' />
			</div>
		</button>
	)
}

export default ScrollToBottom
