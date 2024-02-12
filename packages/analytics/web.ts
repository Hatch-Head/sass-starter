"use client";

import { TRPCClientErrorLike } from "@trpc/client";
import mixpanel from "mixpanel-browser";
import {
    type AnalyticsEventValues,
    type UserIdentifier,
} from "./events";
import { type Analytics } from "./interface";




export class WebAnalytics implements Analytics {

    IS_PROD = process.env.NODE_ENV === "production";

    PLATFORM: "WEB";

    constructor() {
        if (this.IS_PROD) {
            mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY, {
                debug: true,
                track_pageview: true,
                persistence: "localStorage",
            });
            mixpanel.track_pageview();
        } else {
            console.log("ANALYTICS_INIT", process.env.NEXT_PUBLIC_MIXPANEL_API_KEY);
        }
    }

    trackEvent<T extends object>(event: AnalyticsEventValues, properties?: T) {
        if (this.IS_PROD) {
            mixpanel.track(event, { ...properties, platform: "WEB" });
        } else {
            console.log("ANALYTICS_TRACK_EVENT:", event, properties);
        }
    }

    trackError(event: AnalyticsEventValues, error: Error | TRPCClientErrorLike<any>) {
        if (this.IS_PROD) {
            mixpanel.track(`${event}_ERROR`, { error, platform: "WEB" });
        }
    }

    identifyUser(user: UserIdentifier) {
        if (this.IS_PROD) {
            mixpanel.identify(user.id);
            mixpanel.people.set({
                name: user.name || "UNNAMED_USER",
                email: user.email,
            });
        } else {
            console.log("ANALYTICS_IDENTIFY_USER:", user);
        }
    }

    clearUser() {
        if (this.IS_PROD) {
            mixpanel.reset();
        } else {
            console.log("ANALYTICS_CLEAR_USER");
        }
    }
}

