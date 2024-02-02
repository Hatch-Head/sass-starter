import { TEAM_SLUG_COOKIE_NAME } from "@saas/shared/types";
import { createApiCaller } from "api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const isAuthedGuard = async (path: string, withTeamPrefix = true) => {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();
  const teamSlug = cookies().get(TEAM_SLUG_COOKIE_NAME)?.value;

  const redirectPath = withTeamPrefix ? `/${teamSlug}${path}` : path;

  if (user) {
    redirect(redirectPath);
  }
};

export const notAuthedGuard = async () => {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  if (!user) {
    return redirect("/auth/login");
  }

  return user;
};
