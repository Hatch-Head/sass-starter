"use client";

import { Button, Segment } from "@acme/ui";
import { useLocaleCurrency } from "@shared/hooks";
import { cn } from "@ui/lib";
import { ApiOutput } from "api";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
type SubscriptionPlan = ApiOutput["billing"]["plans"][number] & {
  features?: Array<string>;
};

export function PricingTable({
  plans,
  activePlanId,
  onSelectPlan,
  labels,
  className,
}: {
  plans: SubscriptionPlan[];
  activePlanId?: string;
  onSelectPlan: (planId: string, variantId: string) => void | Promise<void>;
  className?: string;
  labels: {
    yearly: string;
    monthly: string;
    month: string;
    year: string;
    subscribe: string;
    currentPlan?: string;
    switchToPlan?: string;
  };
}) {
  const t = useTranslations();
  const localeCurrency = useLocaleCurrency();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const sortedAndFilteredPlans = useMemo(() => {
    return [...plans]
      .map((plan) => {
        const variants = plan.variants.sort((a, b) => a.price - b.price);

        return {
          ...plan,
          variants,
        };
      })
      .filter((plan) => plan.variants.length > 0)
      .sort((a, b) => {
        const lowestPriceA = a.variants.reduce(
          (lowest, variant) => Math.min(lowest, variant.price),
          Infinity,
        );
        const lowestPriceB = b.variants.reduce(
          (lowest, variant) => Math.min(lowest, variant.price),
          Infinity,
        );

        return lowestPriceA - lowestPriceB;
      });
  }, [plans]);

  const isActivePlan = (plan: (typeof plans)[number]) => {
    return activePlanId === plan.id;
  };

  const renderPlans = (interval: "month" | "year") => (
    <div className="@md:grid-cols-3 grid gap-4">
      {sortedAndFilteredPlans.map((plan) => {
        const variant = plan.variants.find((v) => v.interval === interval);
        if (!variant) return null;

        return (
          <div
            key={plan.id}
            className={`${
              isActivePlan(plan)
                ? "border-primary-600 bg-primary-25"
                : "border-gray-400"
            } rounded-xl border p-6`}
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <h3 className="mb-4 text-2xl font-bold">{plan.name}</h3>
                {plan.description && (
                  <div
                    className="prose text-muted-foreground mb-2"
                    dangerouslySetInnerHTML={{ __html: plan.description }}
                  />
                )}

                {!!plan.features?.length && (
                  <ul className="text-muted-foreground grid list-disc gap-2 pl-4">
                    {plan.features.map((feature, key) => (
                      <li key={key}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <strong className="text-primary text-2xl font-bold">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: variant.currency,
                  }).format(variant.price / 100)}
                  <span className="text-sm font-normal opacity-70">
                    {" "}
                    / {labels[interval]}
                  </span>
                </strong>

                <Button
                  variant={"outline"}
                  disabled={isActivePlan(plan)}
                  loading={selectedPlan === plan.id}
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
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={cn(className, "@container")}>
      <div className="flex justify-end">
        <Segment segmentWidth={200} segmentAlign="right" id="period">
          <Segment.Segment label="Monthly">
            {renderPlans("month")}
          </Segment.Segment>
          <Segment.Segment label="Yearly">
            {renderPlans("year")}
          </Segment.Segment>
        </Segment>
      </div>
      <div className="py-4 text-sm text-gray-400">
        <strong>Please note:</strong> When downgrading, we will provide a
        prorate credit on your outstanding subscription but only for the first
        month.
      </div>
    </div>
  );
}
