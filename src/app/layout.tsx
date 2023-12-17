import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import TRPCProvider from "./_trpc/client-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chatzie",
	description: "a Todo list app built with Next.js and TRPC",
	icons: {
		icon: "icon.svg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} antialiased`}>
					<TRPCProvider>{children}</TRPCProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
