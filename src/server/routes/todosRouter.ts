import * as table from "../db/schema";
import { publicProcedure, protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

const TodosRouter = router({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(table.todos);
	}),
	add: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
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
	setDone: publicProcedure
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
