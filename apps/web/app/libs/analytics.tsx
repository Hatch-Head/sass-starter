"use client";

// import { WebAnalytics } from "@acme/analytics";
import { useUser } from "@saas/auth/hooks";
import { useEffect } from "react";

// const analytics = new WebAnalytics();

/**
 * Component to init Analytics
 * @returns
 */
export const Analytics = () => {
  const user = useUser();

  /**
   * Handle logout
   */
  useEffect(() => {
    if (user.loaded && !user?.user) {
      //      analytics.clearUser();
    }
  }, [user]);

  return null;
};
