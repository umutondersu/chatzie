import { todos } from "../db/schema";
import { publicProcedure, router } from "../trpc";

export const TodosRouter = router({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(todos);
	}),
});
