import { statisticsService } from "@/services/statistics.service";
import { TypeStatisticsFormState } from "@/types/statistics.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

export function useInitialStatisticsData(reset: UseFormReset<TypeStatisticsFormState>) {
  const { data, isSuccess } = useQuery({
        queryKey: ['statistics'],
        queryFn: () => statisticsService.getStatistics()
    })

    useEffect(() => {
            if(isSuccess && data){
                reset({
                    title: {
                        ro: data.data.title.ro,
                        ru: data.data.title.ru,
                        en: data.data.title.en
                    },
                    image: data.data.image,
                    projects_number: data.data.projects_number,
                    activity_years: data.data.activity_years,
                    population: data.data.population,
                    total_members: data.data.total_members,
                    total_added_members: data.data.total_added_members,
                    business_members: data.data.business_members,
                    public_members: data.data.public_members,
                    civic_members: data.data.civic_members,
                })
            }
    }, [isSuccess, data, reset])
}