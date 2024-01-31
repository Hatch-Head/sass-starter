import { Select, SelectItem } from "@acme/ui";
import { TeamMemberRole } from "database";
import { useTranslations } from "next-intl";

export function TeamRoleSelect({
  value,
  onSelect,
  disabled,
}: {
  value: TeamMemberRole;
  onSelect: (value: TeamMemberRole) => void;
  disabled?: boolean;
}) {
  const t = useTranslations();

  const roleOptions = [
    {
      label: t("settings.team.members.roles.member"),
      value: "MEMBER",
    },
    {
      label: t("settings.team.members.roles.owner"),
      value: "OWNER",
    },
  ];

  return (
    <Select value={value} disabled={disabled}>
      {roleOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
