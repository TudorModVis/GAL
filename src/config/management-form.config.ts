import { Path } from 'react-hook-form'

import { TypeManagementFormState } from '@/types/management.types'

class MANAGEMENT_FORM_CONFIG { 
	getPresidentPaths = (
		lang: 'ro' | 'ru' | 'en'
	): {
		text: Path<TypeManagementFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { text: 'president.text.ro' }
			case 'ru':
				return { text: 'president.text.ru' }
			case 'en':
				return { text: 'president.text.en' }
			default:
				return { text: 'president.text.ro' }
		}
	}

	getExecutivePaths = (
		lang: 'ro' | 'ru' | 'en'
	): {
		column1: Path<TypeManagementFormState>
		column2: Path<TypeManagementFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { column1: 'executive.column1.ro', column2: 'executive.column2.ro' }
			case 'ru':
				return { column1: 'executive.column1.ru', column2: 'executive.column2.ru' }
			case 'en':
				return { column1: 'executive.column1.en', column2: 'executive.column2.en' }
			default:
				return { column1: 'executive.column1.ro', column2: 'executive.column2.ro' }
		}
	}

    getGeneralAssemblyPaths = (
		lang: 'ro' | 'ru' | 'en'
	): {
		column1: Path<TypeManagementFormState>
		column2: Path<TypeManagementFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { column1: 'general_assembly.column1.ro', column2: 'general_assembly.column2.ro' }
			case 'ru':
				return { column1: 'general_assembly.column1.ru', column2: 'general_assembly.column2.ru' }
			case 'en':
				return { column1: 'general_assembly.column1.en', column2: 'general_assembly.column2.en' }
			default:
				return { column1: 'general_assembly.column1.ro', column2: 'general_assembly.column2.ro' }
		}
	}

    getAdministrationPaths = (
		lang: 'ro' | 'ru' | 'en'
	): {
		column1: Path<TypeManagementFormState>
		column2: Path<TypeManagementFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { column1: 'administration.column1.ro', column2: 'administration.column2.ro' }
			case 'ru':
				return { column1: 'administration.column1.ru', column2: 'administration.column2.ru' }
			case 'en':
				return { column1: 'administration.column1.en', column2: 'administration.column2.en' }
			default:
				return { column1: 'administration.column1.ro', column2: 'administration.column2.ro' }
		}
	}

    getCommitteePaths = (
		lang: 'ro' | 'ru' | 'en'
	): {
		column1: Path<TypeManagementFormState>
		column2: Path<TypeManagementFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { column1: 'committee.column1.ro', column2: 'committee.column2.ro' }
			case 'ru':
				return { column1: 'committee.column1.ru', column2: 'committee.column2.ru' }
			case 'en':
				return { column1: 'committee.column1.en', column2: 'committee.column2.en' }
			default:
				return { column1: 'committee.column1.ro', column2: 'committee.column2.ro' }
		}
	}

    getCensorshipPaths = (
		lang: 'ro' | 'ru' | 'en'
	): {
		column1: Path<TypeManagementFormState>
		column2: Path<TypeManagementFormState>
	} => {
		switch (lang) {
			case 'ro':
				return { column1: 'censorship.column1.ro', column2: 'censorship.column2.ro' }
			case 'ru':
				return { column1: 'censorship.column1.ru', column2: 'censorship.column2.ru' }
			case 'en':
				return { column1: 'censorship.column1.en', column2: 'censorship.column2.en' }
			default:
				return { column1: 'censorship.column1.ro', column2: 'censorship.column2.ro' }
		}
	}
}

export const MANAGEMENT_FORM = new MANAGEMENT_FORM_CONFIG()
