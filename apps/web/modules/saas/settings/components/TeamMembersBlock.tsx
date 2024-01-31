"use client";

import { Tabs } from "@acme/ui";
import { ActionBlock } from "@saas/shared/components";
import { ApiOutput } from "api";
import { useTranslations } from "next-intl";
import { TeamInvitationsList } from "./TeamInvitationsList";
import { TeamMembersList } from "./TeamMembersList";

export function TeamMembersBlock({
  memberships,
  invitations,
}: {
  memberships: ApiOutput["team"]["memberships"];
  invitations: ApiOutput["team"]["invitations"];
}) {
  const t = useTranslations();

  return (
    <ActionBlock title={t("settings.team.members.title")}>
      <Tabs>
        <Tabs.Tab label="Active members">
          <TeamMembersList memberships={memberships} />
        </Tabs.Tab>
        <Tabs.Tab label="Pending invitations">
          <TeamInvitationsList invitations={invitations} />
        </Tabs.Tab>
      </Tabs>
    </ActionBlock>
  );
}
