import { toast } from "sonner"

export const isImageValid = (file: File, maxSizeInMB: number, acceptedImageFormats: string[]): boolean => {

    if (!acceptedImageFormats.includes(file.type)) {
        toast.error(`Invalid file format: ${file.type}. Please select a valid image format. ${acceptedImageFormats.map(format => format.split('/')[1]).join(', ')}`)
        return false
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    if (file.size > maxSizeInBytes) {
        toast.error(`File size must be less than ${maxSizeInMB}MB`) 
        return false
    }

    return true
}