import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import type { IStatisticsResponse, TypeStatisticsFormState } from "@/types/statistics.types";

export class StatisticsService {
    private BASE_URL = '/statistics';

    async getStatistics() {
        const response = await axiosClassic.get<IStatisticsResponse>(
            `${this.BASE_URL}/`
        )

        return response
    }

    async createStatistics(data: TypeStatisticsFormState) {
        const response = await axiosWithAuth.post<IStatisticsResponse>(
            `${this.BASE_URL}/initialize`,
            data
        )

        return response
    }

    async updateStatistics(data: TypeStatisticsFormState) {
        const response = await axiosWithAuth.put<IStatisticsResponse>(
            `${this.BASE_URL}/`,
            data
        )

        return response
    }
}

export const statisticsService = new StatisticsService()