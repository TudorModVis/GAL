import { getTranslations, setRequestLocale } from 'next-intl/server'

import AnimatedLine from '@/components/CommonComponents/AnimatedLine'
import AnimatedText from '@/components/CommonComponents/AnimatedText'
import InfoSection from '@/components/CommonComponents/InfoSection'

import { Link } from '@/i18n/navigation'

export async function generateMetadata() {
	const t = await getTranslations('index.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function Administration({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations('aboutUs.administration')
	return (
		<>
			<main className='relative w-full h-fit mb-[100vh] bg-sand-50'>
				<InfoSection
					tags={['Regulamente', 'Status', 'Strategie', 'Acord de Constituție', 'Rapoarte Anuale']}
					headerText='Documente Oficiale'
					lastActualization='23.03.2025'
					location={['Acasă', 'Despre GAL', 'Documente Oficiale']}
					imageSrc='/official_docs_img.png'
					imageAlt='Test'
				/>
				<section className='w-screen h-fit flex flex-col'>
					<div className='grid grid-cols-full relative w-full'>
						<AnimatedLine customStyles='col-span-full mb-2' />
						<AnimatedText
							text={t('regulations')}
							customStyles='font-bold col-span-3'
						/>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('regulation_text')}
								customStyles='col-span-4 col-start-4'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('regulation_btn')}
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-full relative w-full'>
						<AnimatedLine customStyles='col-span-full mb-2' />
						<AnimatedText
							text={t('statute')}
							customStyles='font-bold col-span-3'
						/>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('statute_text')}
								customStyles='col-span-4 col-start-4'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('regulation_btn')}
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-full relative w-full'>
						<AnimatedLine customStyles='col-span-full mb-2' />
						<AnimatedText
							text={t('strategy')}
							customStyles='font-bold col-span-3'
						/>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('strategy_text1')}
								customStyles='col-span-4 col-start-4'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('strategy_btn')}
							</Link>
						</div>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('strategy_text2')}
								customStyles='col-span-4 col-start-8'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('strategy_btn')}
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-full relative w-full'>
						<AnimatedLine customStyles='col-span-full mb-2' />
						<AnimatedText
							text={t('constitution_agreement')}
							customStyles='font-bold col-span-3'
						/>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('constitution_agreement_text')}
								customStyles='col-span-4 col-start-4'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('constitution_agreement_btn')}
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-full relative w-full'>
						<AnimatedLine customStyles='col-span-full mb-2' />
						<AnimatedText
							text={t('annual_report')}
							customStyles='font-bold col-span-3'
						/>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('annual_report_text1')}
								customStyles='col-span-4 col-start-4'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('annual_report_btn')}
							</Link>
						</div>
						<div className='col-span-3 flex flex-col gap-6'>
							<AnimatedText
								text={t('annual_report_text2')}
								customStyles='col-span-4 col-start-8'
							/>
							<Link
								href='/'
								className='bg-forest-700 hover:bg-forest-600 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24'
							>
								{t('annual_report_btn')}
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
