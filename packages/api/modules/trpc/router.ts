import type {} from "@prisma/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import * as billingProcedures from "../billing/procedures";
import * as newsletterProcedures from "../newsletter/procedures";
import * as teamProcedures from "../team/procedures";
import { router } from "../trpc";
import * as userProcedures from "../user/procedures";

export const apiRouter = router({
  user: router(userProcedures),
  billing: router(billingProcedures),
  team: router(teamProcedures),
  newsletter: router(newsletterProcedures),
});

export type ApiRouter = typeof apiRouter;
export type ApiInput = inferRouterInputs<ApiRouter>;
export type ApiOutput = inferRouterOutputs<ApiRouter>;