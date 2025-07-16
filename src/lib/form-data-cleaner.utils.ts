import { TypeBlogFormState } from '@/types/blog.types'
import { TypeManagementFormState } from '@/types/management.types'

export const cleanBlogFormData = (data: TypeBlogFormState): TypeBlogFormState => {
	const cleaned = data

	const isMultiLangEmpty = (text: { ro?: string; ru?: string; en?: string } | undefined) => {
		if (!text) return true
		return !text.ro?.trim() && !text.ru?.trim() && !text.en?.trim()
	}

	if (cleaned.summary?.column2 && isMultiLangEmpty(cleaned.summary.column2)) {
		delete cleaned.summary.column2
	}

	if (cleaned.sections) {
		cleaned.sections = cleaned.sections.map(section => {
			const cleanedSection = { ...section }

			if (cleanedSection.subsections) {
				cleanedSection.subsections = cleanedSection.subsections.map(subsection => {
					const cleanedSubsection = { ...subsection }

					// Remove column2 if empty
					if (cleanedSubsection.column2 && isMultiLangEmpty(cleanedSubsection.column2)) {
						delete cleanedSubsection.column2
					}

					// Remove images array if empty
					if (cleanedSubsection.images && cleanedSubsection.images.length === 0) {
						delete cleanedSubsection.images
					}

					return cleanedSubsection
				})
			}

			return cleanedSection
		})
	}

	// Remove empty categories array
	if (cleaned.categories && cleaned.categories.length === 0) {
		delete cleaned.categories
	}

	return cleaned
}

const isMultiLangEmpty = (text?: { ro?: string; ru?: string; en?: string }) => {
	if (!text) return true
	return !text.ro?.trim() && !text.ru?.trim() && !text.en?.trim()
}

export const cleanManagementFormData = (data: TypeManagementFormState): TypeManagementFormState => {
	const cleaned = { ...data }

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cleanSection = (section?: { column1: any; column2?: any }) => {
		if (!section) return section
		const cleanedSection = { ...section }
		if (cleanedSection.column2 && isMultiLangEmpty(cleanedSection.column2)) {
			delete cleanedSection.column2
		}
		return cleanedSection
	}

	cleaned.executive = cleanSection(cleaned.executive)
	cleaned.general_assembly = cleanSection(cleaned.general_assembly)
	cleaned.administration = cleanSection(cleaned.administration)
	cleaned.committee = cleanSection(cleaned.committee)
	cleaned.censorship = cleanSection(cleaned.censorship)

	return cleaned
}
