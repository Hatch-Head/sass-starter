"use client";

import { Button } from "@acme/ui";
import { apiClient } from "@shared/lib";
import { Icon } from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";

export function CustomerPortalButton({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  const t = useTranslations();
  const { toast } = useToast();
  const createCustomerPortalMutation =
    apiClient.billing.createCustomerPortalLink.useMutation({
      onError: () => {
        toast({
          variant: "error",
          title: t(
            "settings.billing.createCustomerPortal.notifications.error.title",
          ),
        });
      },
    });

  const createCustomerPortal = async () => {
    try {
      const url = await createCustomerPortalMutation.mutateAsync({
        subscriptionId,
        redirectUrl: window.location.href,
      });

      window.location.href = url;
    } catch {}
  };

  return (
    <Button
      variant="outline"
      leftIcon={<Icon.creditCard className="mr-2 h-4 w-4" />}
      onClick={() => createCustomerPortal()}
      loading={createCustomerPortalMutation.isLoading}
    >
      {t("settings.billing.createCustomerPortal.label")}
    </Button>
  );
}
