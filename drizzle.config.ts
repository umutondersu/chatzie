import { type Config } from "drizzle-kit";

import { env } from "@/env";

if (!env.DATABASE_URL || !env.DATABASE_AUTH_TOKEN) {
	throw new Error("Database Credentials are not set");
}

export default {
	schema: "./src/server/db/schema.ts",
	driver: "turso",
	dbCredentials: {
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	},
} satisfies Config;
