"use client";

import { Button, Icon } from "@components";
import { apiClient } from "api/client";
import { useRouter } from "next/navigation";

export default function CancelSubscriptionButton({
  subscriptionId,
  label,
}: {
  subscriptionId: string;
  label: string;
}) {
  const router = useRouter();
  const cancelSubscriptionMutation =
    apiClient.billing.cancelSubscription.useMutation();

  const cancelSubscription = async () => {
    await cancelSubscriptionMutation.mutateAsync({ subscriptionId });
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={() => cancelSubscription()}>
      <Icon.close className="h-4 w-4" />
      {label}
    </Button>
  );
}