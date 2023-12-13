import * as table from "../db/schema";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

const TodosRouter = router({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(table.todos);
	}),
	add: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		await ctx.db
			.insert(table.todos)
			.values({ content: input, done: false })
			.execute();
		return true;
	}),
	setDone: publicProcedure
		.input(
			z.object({
				id: z.number(),
				done: z.boolean(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(table.todos)
				.set({ done: input.done })
				.where(eq(table.todos.id, input.id))
				.execute();
			return true;
		}),
});

export default TodosRouter;
