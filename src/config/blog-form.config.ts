import { Path } from 'react-hook-form'

import { TypeBlogFormState } from '@/types/blog.types'

class BLOG_FORM_CONFIG {
	MAX_TITLE_LENGTH = 80
	MAX_CONTENT_LENGTH = 5000
	MAX_CATEGORIES = 3
	MAX_IMAGE_FILE_SIZE_IN_MB = 5
	ACCEPTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

	getTitlePath = (lang: 'ro' | 'ru' | 'en'): Path<TypeBlogFormState> => {
		switch (lang) {
			case 'ro':
				return 'title.ro'
			case 'ru':
				return 'title.ru'
			case 'en':
				return 'title.en'
			default:
				return 'title.ro'
		}
	}

	getSummaryPaths = (lang: 'ro' | 'ru' | 'en'): {
		column1: Path<TypeBlogFormState>
		column2: Path<TypeBlogFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { column1: 'summary.column1.ro', column2: 'summary.column2.ro' }
			case 'ru':
				return { column1: 'summary.column1.ru', column2: 'summary.column2.ru' }
			case 'en':
				return { column1: 'summary.column1.en', column2: 'summary.column2.en' }
			default:
				return { column1: 'summary.column1.ro', column2: 'summary.column2.ro' }
		}
	}

	getParagraphTitlePath = (lang: 'ro' | 'ru' | 'en', paragraphIndex: number): Path<TypeBlogFormState> => {
		switch (lang) {
			case 'ro':
				return `sections.${paragraphIndex}.title.ro`
			case 'ru':
				return `sections.${paragraphIndex}.title.ru`
			case 'en':
				return `sections.${paragraphIndex}.title.en`
			default:
				return `sections.${paragraphIndex}.title.ro`
		}
	}
}
export const BLOG_FORM = new BLOG_FORM_CONFIG()