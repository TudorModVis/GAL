import { toast } from 'sonner'

export const isImageValid = (
	file: File,
	maxSizeInMB: number,
	acceptedImageFormats: string[],
	lang: 'ro' | 'ru' | 'en'
): boolean => {
	if (!acceptedImageFormats.includes(file.type)) {
		if (lang === 'ro') {
			toast.error(
				`Formatul fișierului nu este valid: ${file.type}. Vă rugăm să selectați un format de imagine valid. ${acceptedImageFormats.map(format => format.split('/')[1]).join(', ')}`
			)
		} else if (lang === 'ru') {
			toast.error(
				`Недопустимый формат файла: ${file.type}. Пожалуйста, выберите допустимый формат изображения. ${acceptedImageFormats.map(format => format.split('/')[1]).join(', ')}`
			)
		} else {
			toast.error(
				`Invalid file format: ${file.type}. Please select a valid image format. ${acceptedImageFormats.map(format => format.split('/')[1]).join(', ')}`
			)
		}
		return false
	}

	const maxSizeInBytes = maxSizeInMB * 1024 * 1024
	if (file.size > maxSizeInBytes) {
		if (lang === 'ro') {
			toast.error(`Dimensiunea fișierului trebuie să fie mai mică de ${maxSizeInMB}MB`)
		} else if (lang === 'ru') {
			toast.error(`Размер файла должен быть меньше ${maxSizeInMB}МБ`)
		} else {
			toast.error(`File size must be less than ${maxSizeInMB}MB`)
		}
		return false
	}

	return true
}
