import { BlogsCategoriesEnum } from "@/types/blog.types";

export enum ICategoryColor {
	green600 = "bg-green-600",
	green500 = "bg-green-500",
	green400 = "bg-green-400",
	green300 = "bg-green-300",
}

export const getCategoryColor = (category: BlogsCategoriesEnum) : ICategoryColor => {
    switch(category) {
        case BlogsCategoriesEnum.ENTERPRENEURSHIP: return ICategoryColor.green300;
        case BlogsCategoriesEnum.LOGISTICS: return ICategoryColor.green400;
        case BlogsCategoriesEnum.NEWS: return ICategoryColor.green500;
        case BlogsCategoriesEnum.PUBLIC: return ICategoryColor.green600;
        
        default: return ICategoryColor.green600;
    }
}