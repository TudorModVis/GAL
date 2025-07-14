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
}

export const STATISTICS_FORM = new STATISTICS_FORM_CONFIG()
