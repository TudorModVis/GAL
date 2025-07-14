import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import type { IDocumentsResponse, TypeDocumentsFormState } from "@/types/documents.types";

export class DocumentsService {
    private BASE_URL = '/documents'

    async getDocuments() {
        const response = await axiosClassic.get<IDocumentsResponse>(
            `${this.BASE_URL}/`
        )

        return response
    }

    async updateDocuments(data: TypeDocumentsFormState) {
        const response = await axiosWithAuth.put<IDocumentsResponse>(
            `${this.BASE_URL}/`,
            data
        )

        return response
    }
}

export const documentsService = new DocumentsService()
