

import mixpanel from "mixpanel";
import { type AnalyticsEventValues, type UserIdentifier } from "./events";
import { type Analytics } from "./interface";

export class ServerAnalytics implements Analytics {
    mixpanel;

    IS_PROD = process.env.NODE_ENV === "production";

    PLATFORM: "SERVER";

    constructor() {
        if (!process.env.NEXT_PUBLIC_MIXPANEL_API_KEY) {
            throw new Error("NEXT_PUBLIC_MIXPANEL_API_KEY is not set");
        }

        this.mixpanel = mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY);
    }

    trackEvent<T extends object>(event: AnalyticsEventValues, properties?: T) {
        if (this.IS_PROD) {
            this.mixpanel.track(event, { ...properties, platform: "SERVER" });
        }
    }

    trackError(event: AnalyticsEventValues, error: Error) {
        if (this.IS_PROD) {
            this.mixpanel.track(`${event}_ERROR`, { error, platform: "SERVER" });
        }
    }

    identifyUser(user: UserIdentifier) {
        if (this.IS_PROD) {
            this.mixpanel.people.set(user.id, {
                name: user.name || "UNNAMED_USER",
                email: user.email,
            });
        }
    }

    clearUser() {
        if (this.IS_PROD) {
            this.mixpanel.reset();
        }
    }
}

export default ServerAnalytics;
