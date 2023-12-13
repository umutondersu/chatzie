import { todos } from "../db/schema";
import { publicProsedure, router } from "../trpc";

export const TodosRouter = router({
	get: publicProsedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(todos);
	}),
});
