import { importLocale } from "@i18n";
import { UserContextProvider } from "@saas/auth/lib";
import { ClientProviders } from "@shared/components";
import { Toaster } from "@ui/components";
import { createApiCaller } from "api";
import { Metadata } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../../styles/globals.css";
import { Analytics } from "../libs/analytics";
export const metadata: Metadata = {
  title: {
    absolute: "supastarter.nextjs - Application",
    default: "supastarter.nextjs- Application",
    template: "%s | supastarter.nextjs - Application",
  },
};

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  const messages = await importLocale(locale);

  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  // suppressHydrationWarning is required for next-themes warning
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sansFont.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <UserContextProvider user={user}>
              <Analytics />
            </UserContextProvider>

            {children}
          </ClientProviders>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
