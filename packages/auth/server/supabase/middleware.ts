import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = (
  onSuccess: (req: NextRequest) => NextResponse | void,
) => {
  return async (req: NextRequest) => {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const session = await supabase.auth.getSession();

    if (!session.data?.session) {
      return NextResponse.redirect(new NextURL("/auth/signin", req.url));
    }

    return onSuccess(req);
  };
};