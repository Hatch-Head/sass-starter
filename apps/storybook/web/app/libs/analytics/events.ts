const AnalyticsEventName = {
    // Profiles
    PROFILE_UPDATED: "PROFILE_UPDATED",
    PROFILE_PASSWORD_UPDATED: "PROFILE_PASSWORD_UPDATED",

    // Teams
    TEAM_CREATED: "TEAM_CREATED",
    TEAM_DELETED: "TEAM_DELETED",
    TEAM_UPDATED: "TEAM_UPDATED",

    // Team members
    TEAM_MEMBER_INVITED: "TEAM_MEMBER_INVITED",
    TEAM_MEMBER_JOINED: "TEAM_MEMBER_JOINED",
    TEAM_MEMBER_REMOVED: "TEAM_MEMBER_REMOVED",
    TEAM_MEMBER_UPDATED: "TEAM_MEMBER_UPDATED",
    TEAM_MEMBER_CANCELED: "TEAM_MEMBER_CANCELED",

    // Subscriptions
    SUBSCRIPTION_CREATED: "SUBSCRIPTION_CREATED",
    SUBSCRIPTION_UPGRADED: "SUBSCRIPTION_UPGRADED",
    SUBSCRIPTION_DOWNGRADED: "SUBSCRIPTION_DOWNGRADED",
    SUBSCRIPTION_CANCELLED: "SUBSCRIPTION_CANCELLED",
} as const;

export type AnalyticsEventValues = Uppercase<
    (typeof AnalyticsEventName)[keyof typeof AnalyticsEventName]
>;


export type UserIdentifier = {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
};