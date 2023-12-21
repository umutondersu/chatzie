import "server-only";

import { appRouter } from "@/server/router";
import createTRPCContext from "@/server/context";

export const api = appRouter.createCaller(createTRPCContext());

export type Api = typeof api;
