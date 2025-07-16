import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { useGetManagement } from "./useGetManagement";
import { TypeManagementFormState } from "@/types/management.types";

export function useInitialManagementData(reset: UseFormReset<TypeManagementFormState>) {
  const { management, isSuccess } = useGetManagement()

    useEffect(() => {
            if(isSuccess && management){
                reset({
                    main_image: management.main_image,
                    president: {
                        text: {
                            ro: management.president.text.ro,
                            ru: management.president.text.ru,
                            en: management.president.text.en
                        },
                        image: management.president.image
                    },
                    executive: {
                        column1: {
                            ro: management.executive.column1.ro,
                            ru: management.executive.column1.ru,
                            en: management.executive.column1.en
                        },
                        column2: management.executive.column2 ? {
                            ro: management.executive.column2.ro,
                            ru: management.executive.column2.ru,
                            en: management.executive.column2.en
                        } : undefined
                    },
                    general_assembly: {
                        column1: {
                            ro: management.general_assembly.column1.ro,
                            ru: management.general_assembly.column1.ru,
                            en: management.general_assembly.column1.en
                        },
                        column2: management.general_assembly.column2 ? {
                            ro: management.general_assembly.column2.ro,
                            ru: management.general_assembly.column2.ru,
                            en: management.general_assembly.column2.en
                        } : undefined
                    },
                    administration: {
                        column1: {
                            ro: management.administration.column1.ro,
                            ru: management.administration.column1.ru,
                            en: management.administration.column1.en
                        },
                        column2: management.administration.column2 ? {
                            ro: management.administration.column2.ro,
                            ru: management.administration.column2.ru,
                            en: management.administration.column2.en
                        } : undefined
                    },
                    committee: {
                        column1: {
                            ro: management.committee.column1.ro,
                            ru: management.committee.column1.ru,
                            en: management.committee.column1.en
                        },
                        column2: management.committee.column2 ? {
                            ro: management.committee.column2.ro,
                            ru: management.committee.column2.ru,
                            en: management.committee.column2.en
                        } : undefined
                    },
                    censorship: {
                        column1: {
                            ro: management.censorship.column1.ro,
                            ru: management.censorship.column1.ru,
                            en: management.censorship.column1.en
                        },
                        column2: management.censorship.column2 ? {
                            ro: management.censorship.column2.ro,
                            ru: management.censorship.column2.ru,
                            en: management.censorship.column2.en
                        } : undefined
                    }
                })
            }
    }, [isSuccess, management, reset])
}