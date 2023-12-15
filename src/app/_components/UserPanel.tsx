"use client";

import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UserPanel() {
	const { user, isLoaded } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();

	const onClick = async () => {
		await signOut();
		router.refresh();
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{user ? (
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					onClick={onClick}>
					Sign out
				</button>
			) : (
				<div className="[&>*]:bg-blue-500 [&>*]:hover:bg-blue-700 [&>*]:text-white [&>*]:font-bold [&>*]:py-2 [&>*]:px-4 [&>*]:rounded-full">
					<SignInButton />
				</div>
			)}
		</>
	);
}
