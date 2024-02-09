"use server";

import { createApiCaller } from "api";
import { redirect } from "next/navigation";
import { Error } from "../../../../../modules/shared/components/Error";

const TeamInvite = async ({ searchParams }) => {
  const code = searchParams.code || undefined;
  const apiCaller = await createApiCaller();

  // - validate invitations first rather than just creating detached user accounts
  // - then create the user account

  /**
   * No code
   */
  if (!code)
    return <Error message="No code found" title="No code" statusCode={400} />;

  /**
   * Check the invitation exists
   */
  const invitation = await apiCaller.team.invitationById({
    id: code,
  });

  if (!invitation)
    return (
      <Error
        title="Invalid invitation"
        message="Your invitation is not valid, please contact the team owner"
        statusCode={400}
      />
    );

  /**
   * Check invitation as not expired
   */
  if (invitation.expiresAt.getTime() < new Date().getTime())
    return (
      <Error
        title="Invitation expired"
        message="Your invitation has expired, please contact the team owner"
        statusCode={400}
      />
    );

  /**
   * If user is not logged in, redirect to login page. They should be redirected back here after login
   */
  const user = await apiCaller.auth.user();
  if (!user)
    return redirect(
      `/auth/login?invitationCode=${invitation.id}&email=${invitation.email}`,
    );

  /**
   * If user is already in the team, redirect to the team dashboard. Should not happen but just incase
   * Will direct home if there is not team slug
   */
  const memberships = user.teamMemberships || [];
  if (memberships.some((m) => m.team.id === invitation.team_id))
    return redirect(`/${invitation.team?.slug}`);

  try {
    const team = await apiCaller.team.acceptInvitation({
      id: code,
    });

    /**
     * Something went wrong - should not get here
     */
    if (!team)
      return (
        <Error
          title="Could not accept invitation"
          message="Something went wrong, please contact the team. owner"
          statusCode={400}
        />
      );

    return redirect(`/${team.slug}/dashboard`);
  } catch (e) {
    console.error(e);
    return (
      <Error
        title="Could not accept invitation"
        message="Something went wrong, please contact the team owner."
        statusCode={400}
      />
    );
  }
};

export default TeamInvite;
