import Todolist from "./_components/TodoList";
import { api } from "./_trpc/serverClient";

export default async function Home() {
	const todos = await api.Todos.get();
	return (
		<main>
			<p>Hello World!</p>
			<Todolist initialTodos={todos} />
		</main>
	);
}
