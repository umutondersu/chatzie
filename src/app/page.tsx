import TodoList from "./_components/TodoList";
import UserPanel from "./_components/UserPanel";
import { api } from "./_trpc/serverClient";

export default async function Home() {
	const todos = await api.Todos.get();
	return (
		<main className="max-w-3xl mx-auto mt-5">
			<TodoList initialTodos={todos} />
			<UserPanel />
		</main>
	);
}
