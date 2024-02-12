import { type TRPCClientErrorLike } from "@trpc/client";
import { AnalyticsEventValues, UserIdentifier } from "./events";

export interface Analytics {

    IS_PROD: boolean;

    PLATFORM: "WEB" | "SERVER";

    trackEvent<T extends object>(event: AnalyticsEventValues, props: T);

    trackError(event: AnalyticsEventValues, error: Error | TRPCClientErrorLike<any>);

    identifyUser(user: UserIdentifier);

    clearUser();
}