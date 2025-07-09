import type { IBlogResponse, IBlogsResponse, IGetParams, TypeBlogFormState, ImageLinkResponse } from "@/types/blog.types"

import { axiosClassic, axiosWithAuth } from "@/api/interceptors"

class BlogService {
   private BASE_URL = '/blogs' 

    async getAllBlogs(params: IGetParams) {
        const response = await axiosClassic.get<IBlogsResponse>(
            `${this.BASE_URL}/`,
            { params }
        )

        return response
    }

    async getBlogById(id: string) {
        const response = await axiosClassic.get<IBlogResponse>(
            `${this.BASE_URL}/${id}`
        )

        return response
    }

    async createBlog(data: TypeBlogFormState) {
        const response = await axiosWithAuth.post<IBlogResponse>(
            `${this.BASE_URL}/`,
            data
        )

        return response
    }

    async updateBlog(id: string, data: TypeBlogFormState) {
        const response = await axiosWithAuth.put<IBlogResponse>(
            `${this.BASE_URL}/${id}`,
            data
        )

        return response
    }

    async deleteBlog(id: string) {
        const response = await axiosWithAuth.delete<IBlogResponse>(
            `${this.BASE_URL}/${id}`
        )

        return response
    }

    async generateUploadLink() {
        const response = await axiosWithAuth.post<ImageLinkResponse>(
            `${this.BASE_URL}/generate-upload-link`
        )

        return response
    }

    async uploadImage(uploadUrl: string, file: File) {
        const response = await axiosClassic.put(
            uploadUrl,
            file,
            {
                headers: {
                    "Content-Type": file.type
                }
            }
        )

        return response
    }

    async deleteImages(imageUrls: string[]) {
        const response = await axiosWithAuth.post<Omit<ImageLinkResponse, "uploadUrl" | "key" | "publicUrl">>(
            `${this.BASE_URL}/delete-images`,
            { imageUrls }
        )

        return response
    }
}

export const blogService = new BlogService()