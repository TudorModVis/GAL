/* eslint-disable */

import { TypeBlogFormState } from "@/types/blog.types"
import { UseFormRegister } from "react-hook-form"

interface Props {
    register: UseFormRegister<TypeBlogFormState>
    language: 'ro' | 'ru' | 'en'
}

export function BlogForm({ register, language }: Props) {
    return <div>BlogForm {language}</div>
}
