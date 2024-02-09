"use client";
import { CreateTeamForm } from "@saas/shared/components";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create team</CardTitle>
        </CardHeader>

        <CardContent>
          <CreateTeamForm
            isInitialTeam
            onSuccess={(team) => {
              router.push(`${team.slug}`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
