import { prisma } from "../util/client";

export type { Subscription } from "@prisma/client";

export const getSubscriptionByUserId = async (userId: string) => {
  return prisma.subscription.findFirst({
    where: {
      userId: userId,
    },
  });
};
