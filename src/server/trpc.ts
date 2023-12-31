import { initTRPC } from "@trpc/server";
import createTRPCContext from "./context";
import { currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createTRPCContext>().create({});

// Base router and procedure helpers
export const router = t.router;
// export const publicProcedure = t.procedure;

// Middlewares
const userMiddleware = t.middleware(async ({ next }) => {
	const user = await currentUser();
	if (!user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You are not logged in",
		});
	}
	return next({
		ctx: {
			userid: user.id,
		},
	});
});

// Protected procedures using middlewares
export const protectedProcedure = t.procedure.use(userMiddleware);
