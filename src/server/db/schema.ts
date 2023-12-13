import { boolean, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const todos = mysqlTable("todos", {
	id: serial("id").primaryKey().notNull(),
	content: varchar("content", { length: 256 }).notNull(),
	done: boolean("done").default(false).notNull(),
});
