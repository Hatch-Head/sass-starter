"use client";

import WebAnalytics from "@acme/analytics";
import { useUser } from "@saas/auth/hooks";
import { useEffect } from "react";

const analytics = WebAnalytics();

/**
 * Component to init Analytics
 * @returns
 */
export const Analytics = () => {
  const user = useUser();
  useEffect(() => {
    if (IS_PROD) {
      analytics.init();
    } else {
      console.warn("Analytics is disabled in development mode");
    }
  }, []);

  /**
   * Handle logout
   */
  useEffect(() => {
    if (user.loaded && !user?.user) {
      analytics.clearUser();
    }
  }, [user]);

  return null;
};
