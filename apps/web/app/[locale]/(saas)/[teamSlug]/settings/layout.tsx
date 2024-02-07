import { Avatar } from "@acme/ui";
import { appConfig } from "@config";
import { SettingsMenu } from "@saas/settings/components";
import { createApiCaller } from "api";
import BoringAvatar from "boring-avatars";
import { getTranslator } from "next-intl/server";
import { PropsWithChildren } from "react";

export default async function SettingsLayout({
  children,
  params: { teamSlug, locale },
}: PropsWithChildren<{ params: { teamSlug: string; locale: string } }>) {
  const t = await getTranslator(locale);
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  const activeTeam = user?.teamMemberships?.find(
    (membership) => membership.team.slug === teamSlug,
  )?.team;

  if (!activeTeam) return null;

  const menuItems = [
    {
      title: t("settings.menu.team.title"),
      avatar: (
        <BoringAvatar
          size={32}
          name={activeTeam.name}
          variant="marble"
          colors={appConfig.teams.avatarColors}
        />
      ),
      items: [
        {
          title: t("settings.menu.team.general"),
          href: `/${teamSlug}/settings/team/general`,
        },
        {
          title: t("settings.menu.team.members"),
          href: `/${teamSlug}/settings/team/members`,
        },
        {
          title: t("settings.menu.team.billing"),
          href: `/${teamSlug}/settings/team/billing`,
        },
      ],
    },
    {
      title: t("settings.menu.account.title"),
      avatar: <Avatar name={user.name ?? ""} url={user.avatar_url} size="sm" />,
      items: [
        {
          title: t("settings.menu.account.general"),
          href: `/${teamSlug}/settings/account/general`,
        },
        {
          title: t("settings.menu.account.password"),
          href: `/${teamSlug}/settings/account/password`,
        },
      ],
    },
  ];

  return (
    <div className="container max-w-6xl py-8">
      <div className="align-start flex flex-col gap-8 md:flex-row">
        <div className="w-full md:max-w-[200px]">
          <SettingsMenu menuItems={menuItems} />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
