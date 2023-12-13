import TodoList from "./_components/TodoList";
import { api } from "./_trpc/serverClient";

export default async function Home() {
	const todos = await api.Todos.get();
	return (
		<main className="max-w-3xl mx-auto mt-5">
			<TodoList initialTodos={todos} />
		</main>
	);
}
