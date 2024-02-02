import { PageHeader } from "@saas/shared/components";
import { Card } from "@ui/components";
import { createApiCaller } from "api";
import { getTranslator } from "next-intl/server";

export default async function Dashboard({ params: { locale } }) {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();
  const t = await getTranslator(locale);

  return (
    <div className="container max-w-6xl py-8">
      <PageHeader
        title={t("dashboard.welcome", { name: user?.name })}
        subtitle={t("dashboard.subtitle")}
      />

      <Card className="mt-8">
        <div className="text-muted-foreground flex h-64 items-center justify-center p-8">
          Your great app goes here
        </div>
      </Card>
    </div>
  );
}
