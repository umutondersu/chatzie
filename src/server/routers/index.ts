import { router } from "../trpc";
import { TodosRouter } from "./getTodos";

export const appRouter = router({
	Todos: TodosRouter,
});

export type AppRouter = typeof appRouter;
