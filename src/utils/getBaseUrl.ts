const getBaseUrl = () => {
	if (typeof window !== "undefined") return ""; // browser should use relative url

	if (process.env.NODE_ENV === "development")
		return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost

	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
};

export default getBaseUrl;
