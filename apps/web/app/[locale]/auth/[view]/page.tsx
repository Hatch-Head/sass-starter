import { getTranslator } from "next-intl/server";
import { Auth } from "./_components/Auth";
import { AuthView } from "./types";

export async function generateMetadata({ params: { locale, view } }) {
  const t = await getTranslator(locale, "auth");

  const pageTitles = {
    [AuthView.Login]: t("login.title"),
    [AuthView.SignUp]: t("signup.title"),
    [AuthView.ForgotPassword]: t("forgotPassword.title"),
    [AuthView.Setup]: "",
  };

  return {
    title: pageTitles[view],
  };
}

export default function AuthPage({
  params: { view },
}: {
  params: { view: AuthView };
}) {
  return <Auth view={view} />;
}
