import { type Config } from "drizzle-kit";

import { env } from "@/env";

if (!env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

export default {
	schema: "./src/server/db/schema.ts",
	driver: "mysql2",
	dbCredentials: {
		uri: env.DATABASE_URL,
	},
	tablesFilter: ["testt3_*"],
} satisfies Config;
