import { notAuthedGuard } from "@saas/auth/lib/authGuard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const { teamMemberships } = await notAuthedGuard();

  if (teamMemberships === null || teamMemberships.length === 0) {
    return redirect("/onboarding");
  }
  if (teamMemberships.length === 1) {
    return redirect(teamMemberships[0].team.slug);
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col">
        <h1 className="mb-2">Select a team</h1>
        <div className="rounded-lg border border-gray-300">
          {teamMemberships.map((membership) => (
            <Link
              key={membership.id}
              href={membership.team.slug}
              className="hover:text-primary-500 flex w-full items-center justify-between border-b border-gray-300 p-4 font-bold capitalize last:border-b-0"
            >
              {membership.team.name} <ChevronRight />
            </Link>
          ))}
        </div>
      </div>
    </div>
  ); // Marketing pages can go here
};

export default Page;
