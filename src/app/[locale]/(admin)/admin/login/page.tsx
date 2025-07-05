import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { LogIn } from './LogIn'

export const metadata: Metadata = {
    title: 'Admin login',
    ...NO_INDEX_PAGE
}

export default function LoginPage() {
    return <LogIn />
}
