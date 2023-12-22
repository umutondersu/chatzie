import "server-only";

import { appRouter } from "@/server/router";
import createTRPCContext from "@/server/context";

const serverCaller = appRouter.createCaller(createTRPCContext());

export type Api = typeof serverCaller;

export default serverCaller;
