"use client";

import { ActionBlock } from "@saas/shared/components";
import { PricingTable } from "@shared/components";
import { apiClient } from "@shared/lib";
import { ApiOutput } from "api";
import { useTranslations } from "next-intl";

type SubscriptionPlans = ApiOutput["billing"]["plans"];

export function UpgradePlan({
  plans,
  activePlanId,
}: {
  plans: SubscriptionPlans;
  activePlanId: string;
}) {
  const createCheckoutLinkMutation =
    apiClient.billing.createCheckoutLink.useMutation();
  const t = useTranslations();

  return (
    <ActionBlock title={t("settings.billing.subscription.upgradePlan")}>
      <PricingTable
        plans={plans}
        activePlanId={activePlanId}
        onSelectPlan={async (planId, variantId) => {
          const checkoutLink = await createCheckoutLinkMutation.mutateAsync({
            planId,
            variantId,
          });
          window.location.href = checkoutLink;
        }}
        labels={{
          currentPlan: t("settings.billing.subscription.currentPlan"),
          yearly: t("settings.billing.subscription.yearly"),
          monthly: t("settings.billing.subscription.monthly"),
          year: t("settings.billing.subscription.year"),
          month: t("settings.billing.subscription.month"),
          subscribe: t("settings.billing.subscription.subscribe"),
          switchToPlan: t("settings.billing.subscription.switchToPlan"),
        }}
      />
    </ActionBlock>
  );
}