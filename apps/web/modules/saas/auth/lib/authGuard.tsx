import { createApiCaller } from "api";
import { redirect } from "next/navigation";

/**
 * Guard to ensure the user is authenticated
 * @returns
 */
export const isAuthedGuard = async (path: string, withTeamPrefix = true) => {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();
  const memberships = user?.teamMemberships || [];
  const teamSlug =
    user?.teamMemberships?.length > 0
      ? user.teamMemberships[0].team.slug
      : null;

  const redirectPath =
    withTeamPrefix && teamSlug ? `/${teamSlug}${path}` : path;

  if (user) {
    redirect(redirectPath);
  }
};

/**
 * Guard to ensure the user is authenticated
 * @returns
 */
export const notAuthedGuard = async () => {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();
  console.log(user);
  if (!user) {
    return redirect("/auth/login", "replace");
  }

  return user;
};
