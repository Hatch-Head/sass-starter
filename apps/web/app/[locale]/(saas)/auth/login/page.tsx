import { LoginForm } from "@saas/auth/components";
import { isAuthedGuard } from "@saas/auth/lib/authGuard";
import { getTranslator } from "next-intl/server";
export async function generateMetadata({ params: { locale, view } }) {
  const t = await getTranslator(locale);

  return {
    title: t("auth.login.title"),
  };
}

export default async function LoginPage() {
  await isAuthedGuard("/");
  return <LoginForm />;
}
