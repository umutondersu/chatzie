import * as table from "../db/schema";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { eq, and } from "drizzle-orm";

const TodosRouter = router({
	get: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(table.todos)
			.where(eq(table.todos.userid, ctx.userid));
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
					userid: ctx.userid,
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
				.where(
					and(
						eq(table.todos.id, input.id),
						eq(table.todos.userid, ctx.userid)
					)
				)
				.run();
			return true;
		}),
	remove: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.delete(table.todos)
				.where(
					and(
						eq(table.todos.id, input),
						eq(table.todos.userid, ctx.userid)
					)
				)
				.run();
			return true;
		}),
});

export default TodosRouter;
