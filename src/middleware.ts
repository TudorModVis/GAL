import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { ADMIN_PAGES } from './config/admin-pages.config'
import { routing } from './i18n/routing'
import { EnumTokens } from './services/auth-token.service'

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const isLogInPage = url.includes('/admin/login')
	const isAdminRootUrl = url.endsWith('/admin') || url.endsWith('/admin/')
	const isAdminPage = url.includes('/admin') && !url.includes('/administration')

	if (isLogInPage && accessToken) {
		return NextResponse.redirect(new URL(ADMIN_PAGES.NEWS, url))
	}

	if (isLogInPage) {
		return intlMiddleware(request)
	}

	if (isAdminPage && !accessToken) {
		return NextResponse.redirect(new URL(ADMIN_PAGES.LOGIN, url))
	}

	if (isAdminRootUrl && accessToken) {
		return NextResponse.redirect(new URL(ADMIN_PAGES.NEWS, url))
	}

	// For all other pages (non-admin), just apply intl middleware
	const response = intlMiddleware(request)

	return response
}

export const config = {
	matcher: [
		'/', // The root path
		'/(ro|en|ru)/:path*', // Locale-prefixed paths
		'/((?!api|_next|_vercel|.*\\..*).*)'
	]
}
