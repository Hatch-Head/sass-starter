"use client";

import { useFormatter } from "next-intl";
import { useMemo } from "react";

interface Props {
  title: string;
  value: number;
  valueFormat: "currency" | "number" | "percentage";
  context?: string;
  icon?: React.ReactNode;
  trend?: number;
}

export function StatsTile({
  title,
  value,
  context,
  icon,
  trend,
  valueFormat,
}: Props) {
  const format = useFormatter();
  const formattedValue = useMemo(() => {
    // format currency
    if (valueFormat === "currency") {
      return format.number(value, {
        style: "currency",
        currency: "USD",
      });
    }
    // format percentage
    else if (valueFormat === "percentage") {
      return format.number(value, {
        style: "percent",
      });
    }
    // format default number
    else {
      return format.number(value);
    }
  }, [value, valueFormat, format]);

  const formattedTrend = useMemo(() => {
    if (!trend) {
      return null;
    }
    return `${trend >= 0 ? "+" : ""}${format.number(trend, {
      style: "percent",
    })}`;
  }, [trend]);

  return (
    <div className="rounded-xl bg-zinc-50 p-6 dark:bg-zinc-800">
      <h4 className="text-sm opacity-50">{title}</h4>
      <div className="flex items-center justify-between">
        <strong className="text-2xl font-bold">
          {formattedValue}
          {context && <small>{context}</small>}
        </strong>
        {trend && (
          <span
            className={`block rounded-full px-2 py-0.5 text-sm leading-tight ${
              trend > 0
                ? "bg-emerald-500 bg-opacity-10 text-emerald-500"
                : "bg-rose-500 bg-opacity-10 text-rose-500"
            }`}
          >
            {formattedTrend}
          </span>
        )}
      </div>
    </div>
  );
}