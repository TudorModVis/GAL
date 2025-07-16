import type {
	IDocumentsResponse,
	IFileLinkResponse,
	TypeDocumentsFormState
} from '@/types/documents.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

export class DocumentsService {
	private BASE_URL = '/documents'

	async getDocuments() {
		const response = await axiosClassic.get<IDocumentsResponse>(`${this.BASE_URL}/`)

		return response
	}

	async updateDocuments(data: TypeDocumentsFormState) {
		const response = await axiosWithAuth.put<IDocumentsResponse>(`${this.BASE_URL}/`, data)

		return response
	}

	async generateUploadLink() {
		const response = await axiosWithAuth.post<IFileLinkResponse>(
			`${this.BASE_URL}/generate-upload-link`
		)

		return response
	}

	async uploadFile(uploadUrl: string, file: File) {
		const response = await axiosClassic.put(uploadUrl, file, {
			headers: {
				'Content-Type': file.type
			}
		})

		return response
	}

	async deleteFiles(fileUrls: string[]) {
		const response = await axiosWithAuth.post<
			Omit<IFileLinkResponse, 'uploadUrl' | 'key' | 'publicUrl'>
		>(`${this.BASE_URL}/delete-files`, { fileUrls })

		return response
	}
}

export const documentsService = new DocumentsService()
