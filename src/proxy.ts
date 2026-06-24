import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the "middleware" convention to "proxy".
// next-intl's request handler is API-compatible with it.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes, Next internals, and files with an extension
  matcher: "/((?!api|studio|_next|_vercel|.*\\..*).*)",
};
