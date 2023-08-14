import { createApiCaller } from "api";
import { getTranslator, redirect } from "next-intl/server";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePassword";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "settings.account");

  return {
    title: t("title"),
  };
}

export default async function AccountSettingsPage() {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.user.info();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="grid gap-6">
      <ChangeNameForm initialValue={user.name} />
      <ChangePasswordForm />
    </div>
  );
}