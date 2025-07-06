'use client'
/* eslint-disable */

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TypeBlogFormState } from '@/types/blog.types'
import { BlogPageNav } from '@/components/AdminComponents/BlogPageComponents/BlogPageNav'
import { BlogForm } from '@/components/AdminComponents/BlogPageComponents/BlogForm/BlogForm'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const { register, handleSubmit, reset } = useForm<TypeBlogFormState>({
		mode: 'onSubmit'
	})

	return (
		<div className='mt-[3rem]'>
            <BlogPageNav language={language} setLanguage={setLanguage} />

            <BlogForm register={register} language={language} />
		</div>
	)
}
