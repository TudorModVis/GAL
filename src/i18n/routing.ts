import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ro", "en", "ru"],

  pathnames: {
    "/": "/",
    "/news": "/news",
    "/projects": "/projects",
    "/contacts": "/contacts",
    "/aboutUs": "/aboutUs",
    "/administration": "/administration",
    "/documents": "/documents",
    "/invalid-path": "/invalid-path",
  },

  // Used when no locale matches
  defaultLocale: "ro",
});

export type Pathnames = "/";
