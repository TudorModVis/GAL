'use client'

import { useTranslations } from 'next-intl'
import { LangBtn } from '../BlogPageComponents/LangBtn'
import { Button } from '../ui/Button'

import { useRouter } from '@/i18n/navigation'

interface Props {
	language: 'ro' | 'ru' | 'en'
	setLanguage: (lang: 'ro' | 'ru' | 'en') => void
	isPending: boolean
}

export function StatisticsNav({ language, setLanguage, isPending }: Props) {
	const router = useRouter()

    const t = useTranslations('Admin')

	return (
		<div className='flex items-center bg-white sticky top-0 left-0 z-[90] justify-between py-[1.5rem]'>
			<div className='absolute h-[1px] w-full bg-gray-500 bottom-0 left-1/2 -translate-x-1/2' />
			<div className='flex items-center'>
				<LangBtn
					type='button'
					text='Română'
					isActive={language === 'ro'}
					onClick={() => setLanguage('ro')}
				/>

				<LangBtn
					type='button'
					text='English'
					isActive={language === 'en'}
					onClick={() => setLanguage('en')}
				/>

				<LangBtn
					type='button'
					text='Русский'
					isActive={language === 'ru'}
					onClick={() => setLanguage('ru')}
				/>
			</div>
			<div className='flex items-center gap-[2.5rem]'>
				<p
					onClick={() => router.back()}
					className='text-error text-[1rem] leading-[1.125rem] font-[400] cursor-pointer hover:opacity-70 transition-opacity duration-300'
				>
					{t('cancel')}
				</p>
				<Button
					disabled={isPending}
					type='submit'
					className='w-fit px-[1rem] h-[2.5rem]'
				>
					<span className='text-[1rem] leading-[1.125rem] font-[500]'>{t('save')}</span>
				</Button>
			</div>
		</div>
	)
}
