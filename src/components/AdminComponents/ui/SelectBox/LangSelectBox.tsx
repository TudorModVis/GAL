"use client"

import { usePathname, useRouter } from '@/i18n/navigation'
import * as Ariakit from '@ariakit/react'
import { useLocale } from 'next-intl'

export function LangSelectBox() {
	const locale = useLocale()

	const pathname = usePathname()
	const router = useRouter()

	const handleLangSwitch = (lang: string) => {
		router.replace(pathname as any, { locale: lang })
	}

	return (
		<div>
			<Ariakit.SelectProvider defaultValue={`${locale.toUpperCase()}`}>
				<Ariakit.Select className='text-green-700 px-[0.5rem] flex gap-[0.25rem] items-center text-[1rem] font-[400] cursor-pointer [&>span]:transition-transform [&>span]:duration-300 aria-expanded:[&>span]:rotate-180' />
				<Ariakit.SelectPopover
					gutter={4}
					sameWidth
					className='bg-gray-300 rounded-[0.25rem] overflow-hidden scale-y-0 data-[enter]:scale-y-100 origin-top transition-all duration-300'
				>
					<Ariakit.SelectItem
						className='text-green-700 data-[active-item]:bg-gray-400 rounded-[0.25rem] py-[0.25rem] px-[0.5rem] transition-colors duration-300 cursor-pointer'
						value='RO'
						disabled={locale === 'ro'}
						onClick={() => handleLangSwitch('ro')}
					/>
					<Ariakit.SelectItem
						className='text-green-700 data-[active-item]:bg-gray-400 rounded-[0.25rem] py-[0.25rem] px-[0.5rem] transition-colors duration-300 cursor-pointer'
						value='RU'
						disabled={locale === 'ru'}
						onClick={() => handleLangSwitch('ru')}
					/>
					<Ariakit.SelectItem
						className='text-green-700 data-[active-item]:bg-gray-400 rounded-[0.25rem] py-[0.25rem] px-[0.5rem] transition-colors duration-300 cursor-pointer'
						value='EN'
						disabled={locale === 'en'}
						onClick={() => handleLangSwitch('en')}
					/>
				</Ariakit.SelectPopover>
			</Ariakit.SelectProvider>
		</div>
	)
}
