import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PageContent } from './PageContent'

export const metadata: Metadata = {
	title: 'Edit Blog',
	...NO_INDEX_PAGE
}

interface Props { 
    params: { id: string }
}

export default function EditBlogPage({ params }: Props) {

    const { id } = params

	return <PageContent blogId={id}/>
}