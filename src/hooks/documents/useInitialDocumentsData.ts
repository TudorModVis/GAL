import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { TypeDocumentsFormState } from "@/types/documents.types";
import { useGetDocuments } from "./useGetDocuments";

export function useInitialDocumentsData(reset: UseFormReset<TypeDocumentsFormState>) {
  const { documents, isSuccess } = useGetDocuments()

    useEffect(() => {
            if(isSuccess && documents){
                reset({
                    main_image: documents.main_image,
                    regulations: documents.regulations.map(regulation => ({
                        text: {
                            ro: regulation.text.ro,
                            ru: regulation.text.ru,
                            en: regulation.text.en
                        },
                        file: regulation.file
                    })),
                    statuses: documents.statuses.map(status => ({
                        text: {
                            ro: status.text.ro,
                            ru: status.text.ru,
                            en: status.text.en
                        },
                        file: status.file
                    })),
                    strategies: documents.strategies.map(strategy => ({
                        text: {
                            ro: strategy.text.ro,
                            ru: strategy.text.ru,
                            en: strategy.text.en
                        },
                        file: strategy.file
                    })),
                    agreements: documents.agreements.map(agreement => ({
                        text: {
                            ro: agreement.text.ro,
                            ru: agreement.text.ru,
                            en: agreement.text.en
                        },
                        file: agreement.file
                    })),
                    reports: documents.reports.map(report => ({
                        text: {
                            ro: report.text.ro,
                            ru: report.text.ru,
                            en: report.text.en
                        },
                        file: report.file
                    })),
                })
            }
    }, [isSuccess, documents, reset])
}