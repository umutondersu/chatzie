import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
	id: text("id").primaryKey().notNull(),
	content: text("content").notNull(),
	done: integer("done", { mode: "boolean" }).notNull().default(false),
});
