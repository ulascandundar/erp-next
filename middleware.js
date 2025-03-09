import { NextResponse } from "next/server";
import { hasPermission } from "@/components/roleBasedMenus";

let locales = ["en", "tr"];
let defaultLocale = "en";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    //-- start: dil kırılımı var mı?
    const requestHeaders = new Headers(request.headers);
    const lang = requestHeaders?.get("accept-language")?.slice(0, 2);
    const locale = locales.includes(lang) ? lang : defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}${search}`, request.url)
    );
  } else {
    //-- start: Auth sayfa kontrolü
    const pathnameWithOutSlash = pathname.replaceAll("/", "");
    const locale = pathnameWithOutSlash.slice(0, 2);
    const { value: token } = request.cookies.get("token") ?? { value: null };

    if (
      pathnameWithOutSlash != locale &&
      pathname != `/${locale}/auth/login/` &&
      pathname != `/${locale}/auth/validation/` &&
      pathname != `/${locale}/auth/forgot-password/`
    ) {
      if (!token) {
        if (request.method != "POST") {
          return NextResponse.redirect(
            new URL(`/${locale}/auth/login`, request.url)
          );
        }
      } else {
        const base64Token = token.split(".")[1];
        const decodedToken = JSON.parse(
          Buffer.from(
            base64Token.replace("-", "+").replace("_", "/"),
            "base64"
          ).toString("utf-8")
        );
        const pathName = pathname.slice(11);

        if (pathName && !hasPermission(pathName, decodedToken?.role)) {
          if (request.method != "POST") {
            return NextResponse.redirect(
              new URL(`/${locale}/portal/`, request.url)
            );
          }
        }
      }
    }
    return NextResponse.next();
    //-- end: Auth sayfa kontrolü
  }
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
