import { TypeStatisticsFormState } from "@/types/statistics.types"
import { Path } from "react-hook-form"

class STATISTICS_FORM_CONFIG {
	getTitlePath = (lang: 'ro' | 'ru' | 'en'): Path<TypeStatisticsFormState> => {
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

	getMemberNamePath = (lang: 'ro' | 'ru' | 'en', index: number): Path<TypeStatisticsFormState> => {
		switch (lang) {
			case 'ro':
				return `executive_members.${index}.name.ro`
			case 'ru':
				return `executive_members.${index}.name.ru`
			case 'en':
				return `executive_members.${index}.name.en`
			default:
				return `executive_members.${index}.name.ro`
		}
	}

	getMemberPositionPath = (lang: 'ro' | 'ru' | 'en', index: number): Path<TypeStatisticsFormState> => {
		switch (lang) {
			case 'ro':
				return `executive_members.${index}.position.ro`
			case 'ru':
				return `executive_members.${index}.position.ru`
			case 'en':
				return `executive_members.${index}.position.en`
			default:
				return `executive_members.${index}.position.ro`
		}
	}
}

export const STATISTICS_FORM = new STATISTICS_FORM_CONFIG()
