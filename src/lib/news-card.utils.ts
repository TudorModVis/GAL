import { BlogsCategoriesEnum } from '@/types/blog.types'

export enum ICategoryColor {
	green600 = 'bg-green-600',
	green500 = 'bg-green-500',
	green400 = 'bg-green-400',
	green300 = 'bg-green-300'
}

const hashString = (str: string): number => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32-bit integer
	}
	return Math.abs(hash)
}

export const getCategoryColor = (category: BlogsCategoriesEnum): ICategoryColor => {
	const colors = [
		ICategoryColor.green600,
		ICategoryColor.green500,
		ICategoryColor.green400,
		ICategoryColor.green300
	]

	const colorIndex = hashString(category) % colors.length
	return colors[colorIndex]
}
