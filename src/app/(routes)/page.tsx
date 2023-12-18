import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import TodoListPanel from "@/app/_components/TodoListPanel";

export default async function Home() {
	const user = await currentUser();
	return (
		<main className="max-w-3xl mx-auto mt-5">
			<h1 className="text-2xl mb-3">
				<span className="font-bold text-3xl">Chatzie</span> a Todo App
			</h1>
			<div className="border border-double p-2">
				{user ? (
					<TodoListPanel />
				) : (
					<>
						<div className="text-center">
							Please sign in to be able to use the app
						</div>
						<div className="flex items-center justify-center [&>*]:bg-blue-500 [&>*]:hover:bg-blue-700 [&>*]:text-white [&>*]:font-bold [&>*]:py-2 [&>*]:px-4 [&>*]:rounded-full mt-2">
							<SignInButton />
						</div>
					</>
				)}
			</div>
			<section className="relative top-10">
				<div className="underline text-2xl mb-2">Technologies used</div>
				<ul className="[&>*]:text-xl">
					<li>- Next.js</li>
					<li>- tRPC </li>
					<li>- React Query for Data Management</li>
					<li>- Clerk for Authentication</li>
					<li>- Turso for DB on the Edge</li>
					<li>- Drizzle ORM</li>
					<li>- Typescript</li>
					<li>- TailwindCSS for styling</li>
				</ul>
			</section>
		</main>
	);
}
