import { SignOutButton } from "@clerk/nextjs";
import serverCaller from "../lib/trpc/serverClient";
import TodoList from "./TodoList";

export default async function TodoListPanel() {
	const todos = await serverCaller.Todos.get();
	return (
		<>
			<TodoList initialTodos={todos} />
			<div className="[&>*]:bg-blue-500 [&>*]:hover:bg-blue-700 [&>*]:text-white [&>*]:font-bold [&>*]:py-2 [&>*]:px-4 [&>*]:rounded-full mt-2">
				<SignOutButton />
			</div>
		</>
	);
}
