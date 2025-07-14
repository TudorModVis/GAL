import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import type { IManagementResponse, TypeManagementFormState } from "@/types/management.types";

export class ManagementService {
    private BASE_URL = '/management'

    async getManagement() {
        const response = await axiosClassic.get<IManagementResponse>(
            `${this.BASE_URL}/`
        )

        return response
    }

    async updateManagement(data: TypeManagementFormState) {
        const response = await axiosWithAuth.put<IManagementResponse>(
            `${this.BASE_URL}/`,
            data
        )

        return response
    }
}

export const managementService = new ManagementService()