import "server-only";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env";

const client = createClient({
	url:
		env.NODE_ENV === "development"
			? String(env.DEV_DATABASE_URL)
			: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client);

export default db;
