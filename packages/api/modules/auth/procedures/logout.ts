import { ServerAnalytics } from "@acme/analytics";
import { TRPCError } from "@trpc/server";
import { auth } from "auth";
import { protectedProcedure } from "../../trpc";

const analytics = new ServerAnalytics();

export const logout = protectedProcedure.mutation(
  async ({ ctx: { sessionId, responseHeaders } }) => {
    try {
      if (!sessionId) return;
      await auth.invalidateSession(sessionId);
      const sessionCookie = auth.createSessionCookie(null);
      responseHeaders?.append("Set-Cookie", sessionCookie.serialize());
      analytics.trackEvent("AUTH_LOGOUT");
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        analytics.trackError("AUTH_LOGOUT", e);
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  },
);
