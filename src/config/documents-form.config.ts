import { Path } from 'react-hook-form'

import { TypeDocumentsFormState } from '@/types/documents.types'

class DOCUMENTS_FORM_CONFIG {

	MAX_PDF_FILE_SIZE_IN_MB = 10
	ACCEPTED_PDF_FORMATS = ['application/pdf']

	getSectionPaths = (
		lang: 'ro' | 'ru' | 'en',
		section_name: keyof Omit<TypeDocumentsFormState, 'main_image'>,
		index: number
	): {
		text: Path<TypeDocumentsFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { text: `${section_name}.${index}.text.ro` }
			case 'ru':
				return { text: `${section_name}.${index}.text.ru` }
			case 'en':
				return { text: `${section_name}.${index}.text.en` }
			default:
				return { text: `${section_name}.${index}.text.ro` }
		}
	}
}

export const DOCUMENTS_FORM = new DOCUMENTS_FORM_CONFIG()