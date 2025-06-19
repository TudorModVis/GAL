import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ro', 'en', 'ru'],

  pathnames: {
    '/': '/',
  },
 
  // Used when no locale matches
  defaultLocale: 'ro'
});

export type Pathnames = 
"/";