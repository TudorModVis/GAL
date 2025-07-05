import type { IMultiLangText } from "./shared/text.types";

export interface IStatisticsResponse {
    _id: string;
    title: IMultiLangText;
    image: string;
    projects_number: string;
    activity_years: string;
    population: string;
    total_members: string;
    business_members: string;
    public_members: string;
    civic_members: string;
    createdAt: string;
    updatedAt: string;
}

// Create / Update Statistics type ( ! For React Hook Form )
export type TypeStatisticsFormState = Partial<Omit<IStatisticsResponse, '_id' | 'createdAt' | 'updatedAt'>>;
