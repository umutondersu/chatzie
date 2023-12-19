import { SignOutButton } from "@clerk/nextjs";
import { api } from "../_trpc/serverClient";
import TodoList from "./TodoList";

export default async function TodoListPanel() {
	const todos = await api.Todos.get();
	return (
		<>
			<TodoList initialTodos={todos} />
			<div className="[&>*]:bg-blue-500 [&>*]:hover:bg-blue-700 [&>*]:text-white [&>*]:font-bold [&>*]:py-2 [&>*]:px-4 [&>*]:rounded-full mt-2">
				<SignOutButton />
			</div>
		</>
	);
}
