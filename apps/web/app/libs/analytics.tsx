"use client";

import { useUser } from "@saas/auth/hooks";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

type UserIdentifier = {
  id: string;
  name?: string | null | undefined;
};

const IS_PROD = process.env.NODE_ENV === "production";

export const AnalyticsInit = () => {
  console.log("start analytics", process.env.NEXT_PUBLIC_MIXPANEL_API_KEY);
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
  console.log("setup events");
  mixpanel.track_pageview();
};

export const AnalyticsTrackEvent = <T extends any>(
  event: Uppercase<string>,
  properties: T,
) => {
  mixpanel.track(event, properties);
};

export const AnalyticsIdentifyUser = (user: UserIdentifier) => {
  console.log("identify user", user);
  mixpanel.identify(user.id);
  mixpanel.people.set({
    name: user.name || "UNNAMED_USER",
  });
};

export const AnalyticsClearUser = () => {
  console.log("clear user");
  mixpanel.reset();
};

/**
 * Component to init Analytics
 * @returns
 */
export const Analytics = () => {
  console.log("ANAYLTICS COMPONENT");
  const user = useUser();
  useEffect(() => {
    if (!IS_PROD) {
      AnalyticsInit();
    } else {
      console.warn("Analytics is disabled in development mode");
    }
  }, []);

  useEffect(() => {
    console.log("Effect", user);
    if (user?.user) {
      AnalyticsIdentifyUser(user.user);
    } else {
      AnalyticsClearUser();
    }
  }, [user]);

  return null;
};
