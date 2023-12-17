import TodoList from "./_components/TodoList";
import UserPanel from "./_components/UserPanel";
import { api } from "./_trpc/serverClient";

export default async function Home() {
	const todos = await api.Todos.get();
	return (
		<main className="max-w-3xl mx-auto mt-5">
			<h1 className="text-2xl">
				<span className="font-bold text-3xl">Chatzie</span> a Todo App
			</h1>
			<div className="border border-double p-2">
				<TodoList initialTodos={todos} />
				<UserPanel />
			</div>
			<article className="relative top-10">
				<div className="underline text-2xl mb-2">Technologies used</div>
				<ul className="[&>*]:text-xl">
					<li>- Next.js</li>
					<li>- TRPC </li>
					<li>- React Query for Data Management</li>
					<li>- Clerk for Authentication</li>
					<li>- Turso for DB on the Edge (formerly PlanetScale)</li>
					<li>- Drizzle ORM</li>
					<li>- Typescript</li>
					<li>- TailwindCSS for styling</li>
				</ul>
			</article>
		</main>
	);
}
