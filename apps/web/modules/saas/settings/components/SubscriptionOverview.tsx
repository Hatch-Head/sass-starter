"use client";

import { useLocaleCurrency } from "@shared/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components";
import { ApiOutput } from "api";
import { useFormatter, useTranslations } from "next-intl";
import { CustomerPortalButton } from "./CustomerPortalButton";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";

type SubscriptionPlan = ApiOutput["billing"]["plans"][number];

export function SubscriptionOverview({
  plans,
  currentSubscription,
  className,
}: {
  plans: SubscriptionPlan[];
  currentSubscription?: ApiOutput["team"]["subscription"];
  className?: string;
}) {
  const format = useFormatter();
  const t = useTranslations();
  const localeCurrency = useLocaleCurrency();

  const freePlan: SubscriptionPlan = {
    id: "free",
    name: t("settings.billing.subscription.freePlan.title"),
    variants: [
      {
        id: "free",
        interval_count: 1,
        price: 0,
        interval: "month",
        currency: localeCurrency,
      },
    ],
  };

  const activePlanId = currentSubscription
    ? currentSubscription.plan_id
    : "free";
  const activeVariantId = currentSubscription
    ? currentSubscription.variant_id
    : "free";

  const subscriptionPlan = [freePlan, ...plans].find(
    (plan) => plan.id === activePlanId,
  );
  const subscriptionVariant = subscriptionPlan?.variants.find(
    (variant) => variant.id === activeVariantId,
  );

  if (!subscriptionPlan || !subscriptionVariant) {
    return null;
  }

  return (
    <Card className={className} active={true}>
      <CardHeader>
        <CardTitle>
          {t("settings.billing.subscription.currentSubscription")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <h4 className="text-primary text-lg font-bold">
            <span>{subscriptionPlan.name} </span>
            <small className="font-normal">
              (
              {format.number(subscriptionVariant.price / 100, {
                style: "currency",
                currency: subscriptionVariant.currency,
              })}
              /
              {t(
                `settings.billing.subscription.${subscriptionVariant.interval}` as any,
              )}
              )
            </small>
          </h4>
          {currentSubscription?.status && (
            <SubscriptionStatusBadge status={currentSubscription.status} />
          )}
        </div>

        {currentSubscription?.next_payment_date && (
          <p className="foreground mt-1 text-xs text-gray-400">
            {t.rich(
              currentSubscription.status === "CANCELED" ||
                currentSubscription.status === "PAUSED"
                ? "settings.billing.subscription.endsOn"
                : "settings.billing.subscription.nextPayment",
              {
                nextPaymentDate: currentSubscription.next_payment_date,
                strong: (text) => <strong>{text}</strong>,
              },
            )}
          </p>
        )}

        {currentSubscription && (
          <div className="-mx-6 -mb-6 mt-6 flex justify-end border-t px-4 py-3">
            <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
              <div>
                {currentSubscription && (
                  <CustomerPortalButton
                    subscriptionId={currentSubscription.id}
                  />
                )}
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                {(currentSubscription.status === "ACTIVE" ||
                  currentSubscription.status === "TRIALING") && (
                  <>
                    {/* Pause/resume subscription is currently in development */}
                    {/* <PauseSubscriptionButton id={currentSubscription.id} /> */}
                    {/* <CancelSubscriptionButton
                      id={currentSubscription.id}
                      label={t("settings.billing.subscription.cancel")}
                    /> */}
                  </>
                )}

                {/* Pause/resume subscription is currently in development */}
                {/* {currentSubscription.status === "PAUSED" && (
                <ResumeSubscriptionButton
                  id={currentSubscription.id}
                  label={t("settings.billing.subscription.resume")}
                />
              )} */}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
