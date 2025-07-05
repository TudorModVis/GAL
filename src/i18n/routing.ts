import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ro", "en", "ru"],

  pathnames: {
    "/": "/",
    "/news": "/news",
    "/news/[news_name]": "/news/[news_name]",
    "/projects": "/projects",
    "/contacts": "/contacts",
    "/aboutUs": "/aboutUs",
    "/administration": "/administration",
    "/documents": "/documents",
    "/invalid-path": "/invalid-path",
    "/projects/[projects_name]": "/projects/[projects_name]",
    "/localProducts": "/localProducts",
    "/peopleAndValues": "/peopleAndValues",
    "/touristAttractions": "/touristAttractions",
    "/communityServices": "/communityServices",
    "/admin": "/admin",
    "/admin/news": "/admin/news",
    "/admin/news/[news_name]": "/admin/news/[news_name]"

  },

  // Used when no locale matches
  defaultLocale: "ro",
});

export type Pathnames = "/";
