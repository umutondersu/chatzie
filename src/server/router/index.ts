import { router } from "../trpc";
import Todos from "./todos";

export const runtime = "edge";

export const appRouter = router({
	Todos,
});

export type AppRouter = typeof appRouter;
