import { SignupForm } from "@saas/auth/components";
import { isAuthedGuard } from "@saas/auth/lib/authGuard";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale, view } }) {
  const t = await getTranslator(locale);

  return {
    title: t("auth.signup.title"),
  };
}

export default async function SignupPage() {
  await isAuthedGuard("/");
  return <SignupForm />;
}
