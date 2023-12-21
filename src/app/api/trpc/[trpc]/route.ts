import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import createTRPCContext from "@/server/context";
import { appRouter } from "@/server/router";

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createTRPCContext({ req }),
		onError({ error }) {
			if (error.code === "INTERNAL_SERVER_ERROR") {
				console.error("Caught TRPC error:", error);
			}
		},
	});

export { handler as GET, handler as POST };
