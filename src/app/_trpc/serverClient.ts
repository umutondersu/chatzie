import { appRouter } from "@/server/routers/";
import createTRPCContext from "@/server/context";

export const api = appRouter.createCaller(createTRPCContext());
