import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "@/env";
import * as schema from "./schema";

const db = drizzle(
	new Client({
		url: env.DATABASE_URL,
	}).connection(),
	{ schema }
);

export default db;
