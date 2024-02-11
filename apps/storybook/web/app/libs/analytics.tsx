"use client";

import { useUser } from "@saas/auth/hooks";
import { TRPCClientErrorLike } from "@trpc/client";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import {
  type AnalyticsEventValues,
  type UserIdentifier,
} from "./analytics/events";

/**
 * Define analytics events here.
 * Don't add error events
 */

const IS_PROD = true; //process.env.NODE_ENV === "production";

export const AnalyticsInit = () => {
  if (IS_PROD) {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
    mixpanel.track_pageview();
  } else {
    console.log("ANALYTICS_INIT", process.env.NEXT_PUBLIC_MIXPANEL_API_KEY);
  }
};

export const AnalyticsTrackEvent = <T extends object>(
  event: AnalyticsEventValues,
  properties?: T,
) => {
  if (IS_PROD) {
    mixpanel.track(event, { ...properties, platform: "WEB" });
  } else {
    console.log("ANALYTICS_TRACK_EVENT:", event, properties);
  }
};

export const AnalyticsTrackError = (
  event: AnalyticsEventValues,
  error: Error | TRPCClientErrorLike<any>,
) => {
  mixpanel.track(`${event}_ERROR`, { error, platform: "WEB" });
};

export const AnalyticsIdentifyUser = (user: UserIdentifier) => {
  if (IS_PROD) {
    mixpanel.identify(user.id);
    mixpanel.people.set({
      name: user.name || "UNNAMED_USER",
      email: user.email,
    });
  } else {
    console.log("ANALYTICS_IDENTIFY_USER:", user);
  }
};

export const AnalyticsClearUser = () => {
  if (IS_PROD) {
    mixpanel.reset();
  } else {
    console.log("ANALYTICS_CLEAR_USER");
  }
};

/**
 * Component to init Analytics
 * @returns
 */
export const Analytics = () => {
  const user = useUser();
  useEffect(() => {
    if (IS_PROD) {
      AnalyticsInit();
    } else {
      console.warn("Analytics is disabled in development mode");
    }
  }, []);

  /**
   * Handle logout
   */
  useEffect(() => {
    if (user.loaded && !user?.user) {
      AnalyticsClearUser();
    }
  }, [user]);

  return null;
};
