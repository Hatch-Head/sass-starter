"use client";

import { useState } from "react";
import { Button, Switch } from "..";

export function PricingTable({
  plans,
  activePlanId,
  onSelectPlan,
  labels,
}: {
  plans: Array<{
    id: string;
    name: string;
    description?: string;
    features?: Array<string>;
    currency: string;
    variants: Array<{
      id: string | number;
      price: number;
      interval: string;
      interval_count: number;
    }>;
  }>;
  activePlanId?: string;
  onSelectPlan: (planId: string, variantId: string) => void | Promise<void>;
  labels: {
    yearly: string;
    monthly: string;
    subscribe: string;
    currentPlan?: string;
    switchToPlan?: string;
  };
}) {
  // const isClient = useIsClient();
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const isActivePlan = (plan: (typeof plans)[number]) => {
    return activePlanId === plan.id;
  };

  return (
    <div className="@container">
      <div className="flex justify-start">
        <Switch
          options={[
            { label: labels.monthly, value: "month" },
            { label: labels.yearly, value: "year" },
          ]}
          value={interval}
          onChange={(value) => setInterval(value as typeof interval)}
          className="mb-4"
        />
      </div>

      <div className="@md:grid-cols-2 grid gap-4">
        {plans.map((plan) => {
          const variant = plan.variants.find((v) => v.interval === interval);

          if (!variant) return null;

          return (
            <div
              key={plan.id}
              className="rounded-xl border p-6 dark:border-zinc-700"
            >
              <h3 className="mb-4 text-2xl font-bold">{plan.name}</h3>
              {plan.description && (
                <div
                  className="prose mb-2 text-zinc-950/70 dark:text-white/70"
                  dangerouslySetInnerHTML={{ __html: plan.description }}
                />
              )}

              {!!plan.features?.length && (
                <ul className="mb-4 grid list-disc gap-2 pl-4 text-zinc-500">
                  {plan.features.map((feature, key) => (
                    <li key={key}>{feature}</li>
                  ))}
                </ul>
              )}

              <strong className="text-primary-500 text-4xl font-bold">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: plan.currency,
                }).format(variant.price / 100)}
              </strong>

              <Button
                isDisabled={isActivePlan(plan)}
                isLoading={selectedPlan === plan.id}
                className="mt-4 w-full"
                onClick={async () => {
                  setSelectedPlan(plan.id);
                  await onSelectPlan(plan.id, String(variant.id));
                  setSelectedPlan(null);
                }}
              >
                {isActivePlan(plan)
                  ? labels.currentPlan
                  : activePlanId
                  ? labels.switchToPlan
                  : labels.subscribe}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}