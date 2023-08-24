"use client";

import { updateName } from "@saas/auth";
import { ActionBlock } from "@saas/shared/components";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChangeNameForm({ initialValue }: { initialValue: string }) {
  const [name, setName] = useState(initialValue ?? "");
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();
  const changeNameMutation = useMutation(
    ["changeName"],
    async (name: string) => {
      await updateName(name);
    },
    {
      onSuccess: () => {
        toast({
          title: t("settings.notifications.nameUpdated"),
        });
        router.refresh();
      },
    },
  );

  return (
    <ActionBlock
      title={t("settings.account.changeName.title")}
      onSubmit={() => changeNameMutation.mutate(name)}
      isSubmitting={changeNameMutation.isLoading}
      isSubmitDisabled={!name || name.length < 3 || name === initialValue}
    >
      <Input
        type="text"
        className="max-w-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </ActionBlock>
  );
}