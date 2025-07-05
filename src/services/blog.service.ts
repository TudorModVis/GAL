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

    async generateUploadLink(id: string) {
        const response = await axiosWithAuth.post<ImageLinkResponse>(
            `${this.BASE_URL}/${id}/generate-upload-link`
        )

        return response
    }

    async deleteImages(images: string[]) {
        const response = await axiosWithAuth.post<Omit<ImageLinkResponse, "imageUrl" | "key">>(
            `${this.BASE_URL}/delete-images`,
            { images }
        )

        return response
    }
}

export const blogService = new BlogService()