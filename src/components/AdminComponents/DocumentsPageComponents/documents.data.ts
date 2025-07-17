import { TypeDocumentsFormState } from "@/types/documents.types"

interface DocumentGroup {
    text: {
        ro: string
        ru: string
        en: string
    }
    color: string
    name: keyof Omit<TypeDocumentsFormState, 'main_image'>
}

export const DOCUMENT_GROUPS: DocumentGroup[] = [
    {
        text: {
            ro: "Regulamente",
            ru: "Регламенты",
            en: "Regulations",
        },
        color: 'bg-green-600',
        name: 'regulations'
    },
    {
        text: {
            ro: "Statut",
            ru: "Статут",
            en: "Statute",
        },
        color: 'bg-green-400',
        name: 'statuses'
    },
    {
        text: {
            ro: "Strategie",
            ru: "Стратегия",
            en: "Strategy",
        },
        color: 'bg-green-500',
        name: 'strategies'
    },
    {
        text: {
            ro: "Acord de Constituție",
            ru: "Учредительный договор",
            en: "Constitutional Agreement",
        },
        color: 'bg-green-400',
        name: 'agreements'
    },
    {
        text: {
            ro: "Rapoarte Anuale",
            ru: "Ежегодные отчеты",
            en: "Annual Reports",
        },
        color: 'bg-green-600',
        name: 'reports'
    }
] 