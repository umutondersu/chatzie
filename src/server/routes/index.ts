import { router } from "../trpc";
import TodosRouter from "./todosRouter";

export const appRouter = router({
	Todos: TodosRouter,
});

export type AppRouter = typeof appRouter;
