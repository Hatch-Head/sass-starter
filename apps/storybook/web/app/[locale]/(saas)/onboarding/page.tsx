"use client";

import { CreateTeamForm } from "@saas/shared/components";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Team</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateTeamForm
            isInitialTeam
            onSuccess={async (team) => {
              router.push(`/${team.slug}`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
