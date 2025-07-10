'use client'

import * as Ariakit from '@ariakit/react'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'

import { usePathname, useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

export function LangSelectBox() {
	const locale = useLocale()

	const pathname = usePathname()
	const router = useRouter()
	const params = useParams()

	const handleLangSwitch = (lang: string) => {
		if(params.id) {
			const dynamicPathname = pathname.replace(`[id]`, params.id as string)
			console.log('Dynamic Pathname:', dynamicPathname)
			router.replace(dynamicPathname as Pathnames, {
				locale: lang
			})
			return
		}

		router.replace(pathname as Pathnames, {
			locale: lang
		})
	}

	return (
		<div>
			<Ariakit.SelectProvider defaultValue={`${locale.toUpperCase()}`}>
				<Ariakit.Select className='text-green-700 px-[0.5rem] flex gap-[0.25rem] items-center text-[1rem] font-[400] cursor-pointer [&>span]:transition-transform [&>span]:duration-300 aria-expanded:[&>span]:rotate-180' />
				<Ariakit.SelectPopover
					gutter={4}
					sameWidth
					className='bg-gray-300 z-[10] rounded-[0.25rem] overflow-hidden scale-y-0 data-[enter]:scale-y-100 origin-top transition-all duration-300'
				>
					<Ariakit.SelectItem
						className={`${locale === 'ro' && 'hidden'} text-green-700 data-[active-item]:bg-gray-400 rounded-[0.25rem] py-[0.25rem] px-[0.5rem] transition-colors duration-300 cursor-pointer`}
						value='RO'
						disabled={locale === 'ro'}
						onClick={() => handleLangSwitch('ro')}
					/>
					<Ariakit.SelectItem
						className={`${locale === 'ru' && 'hidden'} text-green-700 data-[active-item]:bg-gray-400 rounded-[0.25rem] py-[0.25rem] px-[0.5rem] transition-colors duration-300 cursor-pointer`}
						value='RU'
						disabled={locale === 'ru'}
						onClick={() => handleLangSwitch('ru')}
					/>
					<Ariakit.SelectItem
						className={`${locale === 'en' && 'hidden'} text-green-700 data-[active-item]:bg-gray-400 rounded-[0.25rem] py-[0.25rem] px-[0.5rem] transition-colors duration-300 cursor-pointer`}
						value='EN'
						disabled={locale === 'en'}
						onClick={() => handleLangSwitch('en')}
					/>
				</Ariakit.SelectPopover>
			</Ariakit.SelectProvider>
		</div>
	)
}
