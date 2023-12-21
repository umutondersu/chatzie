import { router } from "../trpc";
import Todos from "./todos";

export const appRouter = router({
	Todos,
});

export type AppRouter = typeof appRouter;
