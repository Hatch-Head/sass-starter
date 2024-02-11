import ProfileForm from "@saas/settings/components/ProfileForm";
import { getTranslator } from "next-intl/server";
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale);

  return {
    title: t("settings.account.title"),
  };
}

export default async function AccountSettingsPage() {
  return (
    <div className="grid gap-6">
      <ProfileForm />
    </div>
  );
}
