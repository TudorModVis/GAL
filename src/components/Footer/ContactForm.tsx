'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { useSendContactForm } from '@/hooks/contact/useSendContactForm'

import Arrow from '../CommonComponents/Arrow'

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRx = /^\+?[0-9\s\-()]{7,}$/

const topics = ['donation', 'consultation', 'collaboration', 'different_topic'] as const

const ContactForm = () => {
	const t = useTranslations('index.Footer')
	const { sendForm, isPending } = useSendContactForm()

	const [topic, setTopic] = useState<string | null>(null)
	const [confirmed, setConfirmed] = useState(false)

	const [data, setData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		message: ''
	})

	type Errors = Record<keyof typeof data | 'topic' | 'confirmation', boolean>

	const [errors, setErrors] = useState<Errors>({
		name: false,
		surname: false,
		email: false,
		phone: false,
		message: false,
		topic: false,
		confirmation: false
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target as {
			name: keyof typeof data
			value: string
		}
		setData(p => ({ ...p, [name]: value }))
		if (errors[name]) setErrors(p => ({ ...p, [name]: false }))
	}

	const validate = () => {
		const next: Errors = {
			name: !data.name.trim(),
			surname: !data.surname.trim(),
			email: !emailRx.test(data.email.trim()),
			phone: !phoneRx.test(data.phone.trim()),
			message: !data.message.trim(),
			topic: topic === null,
			confirmation: !confirmed
		}
		setErrors(next)
		return Object.values(next).every(v => v === false)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		sendForm(
			{
				...data,
				subject: topic != null ? t(`form_text.${topic}_button`) : 'Contact Form Submission'
			},
			{
				onSuccess: () => {
					setData({
						name: '',
						surname: '',
						email: '',
						phone: '',
						message: ''
					})
					setTopic(null)
					setConfirmed(false)
					setErrors(p => Object.fromEntries(Object.keys(p).map(k => [k, false])) as Errors)
				}
			}
		)
	}

	const shakeClassIf = (flag: boolean) => (flag ? 'shakeClass' : '')

	const fldClass = (k: keyof typeof data) =>
		`col-span-3 px-2 py-2.5 outline-0 sm:mb-0 mb-2 border-b-[1px] ${
			errors[k] ? 'border-red-500' : 'border-[#6F915E]'
		} ${shakeClassIf(errors[k])}`

	return (
		<form
			onSubmit={handleSubmit}
			className='contents'
		>
			<div className='col-span-full'>
				<h4 className='font-bold'>{t('form_text.how_can_we_help_header')}</h4>

				<div className='flex flex-wrap gap-2 sm:gap-4 mt-4 mb-6'>
					{topics.map(key => (
						<button
							key={key}
							type='button'
							onClick={() => {
								setTopic(key)
								if (errors.topic) setErrors(p => ({ ...p, topic: false }))
							}}
							className={`transition rounded-full font-medium sm:px-4 px-3.5 py-2.5 cursor-pointer
                          ${shakeClassIf(errors.topic)}
                          ${
														topic === key
															? '!bg-forest-800 !text-sand-50'
															: `bg-sand-50 text-forest-900 ${
																	errors.topic ? 'border border-red-500' : ''
																}`
													}`}
						>
							{t(`form_text.${key}_button`)}
						</button>
					))}
				</div>
			</div>

			<h4 className='font-bold col-span-full sm:mb-0 mb-6'>
				{t('form_text.personal_data_header')}
			</h4>

			<input
				className={fldClass('name')}
				placeholder={t('form_text.name_placeholder')}
				type='text'
				name='name'
				value={data.name}
				onChange={handleChange}
			/>

			<input
				className={fldClass('email')}
				placeholder='Email'
				type='email'
				name='email'
				value={data.email}
				onChange={handleChange}
			/>

			<input
				className={fldClass('surname')}
				placeholder={t('form_text.surname_placeholder')}
				type='text'
				name='surname'
				value={data.surname}
				onChange={handleChange}
			/>

			<input
				className={`${fldClass('phone')} mb-0`}
				placeholder={t('form_text.telephone_placeholder')}
				type='tel'
				name='phone'
				value={data.phone}
				onChange={handleChange}
			/>

			<h4 className='font-bold col-span-full mt-6'>{t('form_text.message_header')}</h4>

			<textarea
				className={`col-span-full border-b-[1px] px-2 py-2.5 outline-0 resize-none mt-4 ${
					errors.message ? 'border-red-500' : 'border-[#6F915E]'
				} ${shakeClassIf(errors.message)}`}
				placeholder={t('form_text.message_placeholder')}
				rows={3}
				name='message'
				value={data.message}
				onChange={handleChange}
			/>

			<div className='col-span-full flex sm:items-center my-4'>
				<input
					type='checkbox'
					id='confirmation'
					name='confirmation'
					checked={confirmed}
					onChange={e => {
						setConfirmed(e.target.checked)
						if (errors.confirmation) setErrors(p => ({ ...p, confirmation: false }))
					}}
					className={`mr-2 w-3 h-3 shrink-0 sm:mt-0 mt-1 appearance-none cursor-pointer
                      transition border-[1px] rounded-xs
                      checked:bg-[url("/checkmark.svg")] checked:bg-center checked:bg-no-repeat
                      ${errors.confirmation ? 'border-red-500 shakeClass' : 'border-sand-50'}`}
				/>
				<label
					htmlFor='confirmation'
					className={`text-xs ${errors.confirmation ? 'text-red-500 shakeClass' : ''}`}
				>
					{t('form_text.checkmark_label')}
				</label>
			</div>

			<div className='col-span-full'>
				<button
					disabled={isPending}
					type='submit'
					className={`flex gap-1 mx-auto w-full items-center group/link cursor-pointer
                     [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4
                     [&>div]:text-forest-900 [&>div]:bg-sand-50
                     [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full
                     [&>div:nth-child(2)]:p-3`}
				>
					<div className='transition text-nowrap'>
						{isPending ? t('form_text.loading') : t('form_text.contact_button_text')}
					</div>
					<div className='flex items-center justify-center transition'>
						<Arrow arrowCustomStyle='group-hover/link:rotate-0 -rotate-45 fill-forest-900' />
					</div>
				</button>
			</div>
		</form>
	)
}

export default ContactForm
