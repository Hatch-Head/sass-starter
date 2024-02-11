import { UserContextProvider } from "@saas/auth/lib";
import { NavBar } from "@saas/shared/components";
import PaymentIssue from "@saas/shared/components/PaymentIssue";
import { NotInTeam } from "@shared/components/Error";
import { createApiCaller } from "api";
import { notFound, redirect } from "next/navigation";
import { PropsWithChildren } from "react";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Layout({
  children,
  params: { teamSlug },
}: PropsWithChildren<{ params: { teamSlug: string } }>) {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  if (!user) return redirect("/auth/login");

  const { teamMemberships } = user;

  const currentTeamMembership = teamMemberships?.find(
    (membership) => membership.team.slug === teamSlug,
  );

  // Check user permissions
  if (!currentTeamMembership) {
    const teamExists = await apiCaller.team.exists({ slug: teamSlug });
    if (teamExists) {
      return <NotInTeam />;
    } else {
      return notFound();
    }
  }

  // Subscription
  const subscription = await apiCaller.team.subscription({
    teamId: currentTeamMembership.team.id,
  });

  const paymentIssue =
    subscription?.status === "UNPAID" ||
    subscription?.status === "PAST_DUE" ||
    subscription?.status === "INCOMPLETE" ||
    subscription?.status === "EXPIRED";

  return (
    <UserContextProvider
      initialUser={user}
      teamRole={currentTeamMembership?.role}
    >
      <div className="flex h-screen w-full flex-col">
        {paymentIssue && <PaymentIssue />}
        <NavBar
          user={user}
          teams={teamMemberships?.map((membership) => membership.team) ?? []}
        />
        <main className="bg-muted">{children}</main>
      </div>
    </UserContextProvider>
  );
}
