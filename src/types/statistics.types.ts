import type { IMultiLangText } from "./shared/text.types";

export interface IExecutiveMember {
    image: string;
    name: IMultiLangText;
    position: IMultiLangText;
}

export interface IStatisticsResponse {
    _id: string;
    title: IMultiLangText;
    image: string;
    projects_number: number;
    activity_years: number;
    population: number;
    total_members: number;
    total_added_members: number;
    business_members: number;
    public_members: number;
    civic_members: number;
    executive_members: IExecutiveMember[];
    createdAt: string;
    updatedAt: string;
}

// Create / Update Statistics type ( ! For React Hook Form )
export type TypeStatisticsFormState = Partial<Omit<IStatisticsResponse, '_id' | 'createdAt' | 'updatedAt'>>;
