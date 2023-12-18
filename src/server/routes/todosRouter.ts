import * as table from "../db/schema";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

const TodosRouter = router({
	get: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(table.todos);
	}),
	add: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.insert(table.todos)
				.values({
					id: crypto.randomUUID(),
					content: input,
					done: false,
				})
				.run();
			return true;
		}),
	setDone: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				done: z.boolean(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(table.todos)
				.set({ done: input.done })
				.where(eq(table.todos.id, input.id))
				.run();
			return true;
		}),
	remove: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.delete(table.todos)
				.where(eq(table.todos.id, input))
				.run();
			return true;
		}),
});

export default TodosRouter;
