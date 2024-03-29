import { Logo } from "@acme/ui";
import { appConfig } from "@config";
import { UserContextProvider } from "@saas/auth/lib";
import { ColorModeToggle, LocaleSwitch } from "@shared/components";
import { Card } from "@ui/components";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren<{}>) {
  const locale = useLocale();
  //await isAuthedGuard("/");
  return (
    <UserContextProvider initialUser={null}>
      <div className=" text-foreground flex min-h-screen place-items-center">
        <div className="container">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="block">
                <Logo />
              </Link>

              <div className="flex items-center justify-end gap-2">
                <LocaleSwitch
                  locales={appConfig.i18n.locales}
                  currentLocale={locale}
                />
                <ColorModeToggle />
              </div>
            </div>

            <Card className="p-8">{children}</Card>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
}
