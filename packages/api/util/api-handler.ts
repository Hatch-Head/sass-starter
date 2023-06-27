import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { config } from "../config";
import { appRouter } from "../router";

export const apiHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: config.apiPath,
    req,
    router: appRouter,
    createContext: () => ({}),
  });
