import { PageHeader } from "@components/PageHeader";
import { TabGroup } from "@components/TabGroup";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

export default function SettingsLayout({ children }: PropsWithChildren<{}>) {
  const t = useTranslations("settings");

  return (
    <div>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="container py-6">
        <TabGroup
          items={["account", "billing"].map((segment) => ({
            label: t(`${segment}.title` as any),
            href: `${segment}`,
            segment,
          }))}
          className="mb-6"
        />

        {children}
      </div>
    </div>
  );
}