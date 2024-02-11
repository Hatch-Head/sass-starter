import mixpanel from "mixpanel";
import { type AnalyticsEventValues, type UserIdentifier } from "./events";

class ServerAnalytics {
  mixpanel;

  constructor() {
    if (!process.env.NEXT_PUBLIC_MIXPANEL_API_KEY) {
      throw new Error("NEXT_PUBLIC_MIXPANEL_API_KEY is not set");
    }

    this.mixpanel = mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY);
  }

  trackEvent<T extends object>(event: AnalyticsEventValues, properties?: T) {
    console.log(this.mixpanel);
    this.mixpanel.track(event, { ...properties, platform: "SERVER" });
  }

  trackError(event: AnalyticsEventValues, error: Error) {
    this.mixpanel.track(`${event}_ERROR`, { error, platform: "SERVER" });
  }

  identifyUser(user: UserIdentifier) {
    this.mixpanel.people.set(user.id, {
      name: user.name || "UNNAMED_USER",
      email: user.email,
    });
  }
}

export default ServerAnalytics;
