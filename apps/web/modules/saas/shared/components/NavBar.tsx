"use client";

import { Logo } from "@acme/ui";
import { UserMenu } from "@marketing/shared/components";
import { Icon } from "@ui/components";
import { ApiOutput } from "api";
import { Team } from "database";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useParams, usePathname } from "next/navigation";
import { PropsWithChildren, useCallback } from "react";
import { TeamSelect } from "./TeamSelect";
type User = ApiOutput["auth"]["user"];

export function NavBar({
  teams,
  user,
}: PropsWithChildren<{ teams: Team[]; user: User }>) {
  const t = useTranslations();
  const pathname = usePathname();
  const { teamSlug } = useParams();

  const menuItems = [
    {
      label: t("dashboard.menu.dashboard"),
      href: `/${teamSlug}/dashboard`,
      icon: Icon.grid,
    },
    {
      label: t("dashboard.menu.settings"),
      href: `/${teamSlug}/settings`,
      icon: Icon.settings,
    },
  ];

  const isActiveMenuItem = useCallback(
    (href: string | null) => {
      return href && pathname.includes(href);
    },
    [pathname],
  );

  return (
    <nav className="bg-muted w-full  border-gray-300">
      <div className="border-b border-gray-300 py-2">
        <div className="container max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4 ">
            <div className="flex items-center gap-3 ">
              <Link href={`/${teamSlug}/dashboard`} className="block">
                <Logo />
              </Link>

              <span className="hidden opacity-30 lg:block">
                <Icon.chevronRight className="h-4 w-4" />
              </span>

              <TeamSelect teams={teams} />
            </div>

            <div className="ml-auto mr-0 flex items-center justify-end gap-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
