"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "./client";
import { env } from "@/env";

const getBaseUrl = () => {
	if (typeof window !== "undefined") return ""; // browser should use relative url

	if (env.NODE_ENV === "development")
		return `http://localhost:${env.PORT ?? 3000}`; // dev SSR should use localhost

	if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`; // SSR should use vercel url
};

export default function TRPCProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient({}));
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => true,
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}
