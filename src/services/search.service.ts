import { axiosClassic } from "@/api/interceptors";
import { ISearchResponse } from "@/types/search.types";

export class SearchService {
    private BASE_URL = '/search';

    async search(query: string) {
        const response = await axiosClassic.get<ISearchResponse>(
            `${this.BASE_URL}/`,
            {
                params: {
                    q: query
                }
            }
        );

        return response;
    }
}

export const searchService = new SearchService()