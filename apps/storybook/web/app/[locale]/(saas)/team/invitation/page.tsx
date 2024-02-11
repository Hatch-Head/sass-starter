import { createApiCaller } from "api";
import { redirect } from "next/navigation";
import { Error as ErrorView } from "../../../../../modules/shared/components/Error";
import ServerAnalytics from "../../../../libs/analytics/server";

class InvitationError extends Error {
  constructor(message) {
    super(message);
    this.name = message;
  }
}

const InvitationPage = async ({ searchParams }) => {
  const code = searchParams?.code;
  const Analytics = new ServerAnalytics();

  /**
   * No code in the query
   */
  if (!code) {
    Analytics.trackError(
      "TEAM_MEMBER_JOINED",
      new InvitationError("No code in query"),
    );
    return redirect("/");
  }
  const apiCaller = await createApiCaller();

  const invitation = await apiCaller.team.invitationById({
    id: code,
  });

  /**
   * No invitation
   */
  if (!invitation) {
    Analytics.trackError(
      "TEAM_MEMBER_JOINED",
      new InvitationError("No invitation was found"),
    );
    return (
      <ErrorView
        statusCode={403}
        title="Invalid invitation"
        message="Your invitation is not valid. "
      />
    );
  }

  /**
   * Expired invitation
   */
  if (invitation.expiresAt.getTime() < new Date().getTime()) {
    Analytics.trackError(
      "TEAM_MEMBER_JOINED",
      new InvitationError("Invitation expired"),
    );
    return (
      <ErrorView
        statusCode={403}
        title="Expired invitation"
        message="Your invitation has expired."
      />
    );
  }

  /**
   * No user (they will be redirected back here once they've signed in and restart the flow)
   */
  const user = await apiCaller.auth.user();

  if (!user)
    return redirect(
      `/auth/signup?invitationCode=${invitation.id}&email=${encodeURIComponent(
        invitation.email,
      )}`,
    );

  Analytics.identifyUser(user);

  /**
   * User has already accepted the invite through the auth flow
   */
  const existingTeam = user.teamMemberships?.find(
    (m) => m.team.id === invitation.team_id,
  );
  if (existingTeam) {
    Analytics.trackEvent("TEAM_MEMBER_JOINED", existingTeam);
    // Success redirect to team
    return redirect(`/${existingTeam.team.slug}`);
  }

  try {
    const team = await apiCaller.team.acceptInvitation({
      id: code,
    });

    // Should not get here as the procedure should throw an error if something goes wrong
    if (!team) {
      Analytics.trackError(
        "TEAM_MEMBER_JOINED",
        new InvitationError("Unknown error"),
      );
      return (
        <ErrorView
          statusCode={400}
          title="Could not accept invitation"
          message="There was something wrong with your invitation."
        />
      );
    }

    Analytics.trackEvent("TEAM_MEMBER_JOINED", team);
    // Success redirect to team
    return redirect(`/${team.slug}`);
  } catch (e) {
    Analytics.trackError("TEAM_MEMBER_JOINED", e);

    <ErrorView
      statusCode={500}
      title="Could not accept invitation"
      message={e.message}
    />;
  }
};

export default InvitationPage;
