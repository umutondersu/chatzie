"use client";

import { useState } from "react";
import { trpc } from "../lib/trpc/client";
import type { TodoList } from "@/lib/types";
import { OptimisticMutationHelper } from "@/lib/utils";

export default function TodoList({ initialTodos }: { initialTodos: TodoList }) {
	const utils = trpc.useUtils();
	const Todos = trpc.Todos.get.useQuery(undefined, {
		initialData: initialTodos,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const addTodo = trpc.Todos.add.useMutation({
		onMutate: async () =>
			OptimisticMutationHelper(utils.Todos.get, (prevstate) => [
				...prevstate,
				{
					id: "OPTIMISTIC_ID",
					done: false,
					content,
					userid: "OPTIMISTIC_USERID",
				},
			]),
		onError: (_error, _newTodo, context) => {
			utils.Todos.get.setData(undefined, context!.previousTodos);
			// queryClient.setQueryData(todosQueryKey, context!.previousTodos);
		},
		onSettled: () => {
			utils.Todos.get.invalidate();
		},
	});

	const setDone = trpc.Todos.setDone.useMutation({
		onMutate: async ({ id }) =>
			OptimisticMutationHelper(utils.Todos.get, (prevstate) =>
				prevstate.map((todo) =>
					todo.id === id ? { ...todo, done: !todo.done } : todo
				)
			),
		onError: (error, _newTodo, context) => {
			alert(error.message);
			utils.Todos.get.setData(undefined, context!.previousTodos);
		},
		onSettled: () => {
			utils.Todos.get.invalidate();
		},
	});

	const removeTodo = trpc.Todos.remove.useMutation({
		onMutate: async ({ id }) =>
			OptimisticMutationHelper(utils.Todos.get, (prevstate) =>
				prevstate.filter((todo) => todo.id !== id)
			),
		onError: (_error, _newTodo, context) => {
			utils.Todos.get.setData(undefined, context!.previousTodos);
		},
		onSettled: () => {
			utils.Todos.get.invalidate();
		},
	});

	const [content, setContent] = useState("");

	return (
		<>
			<div className="text-black my-5 text-3xl">
				{Todos.data.length != 0 ? (
					Todos.data.map((todo) => (
						<div key={todo.id} className="flex gap-3 items-center">
							<input
								id={`check-${todo.id}`}
								type="checkbox"
								checked={todo.done}
								style={{ zoom: 1.5 }}
								onChange={async () => {
									setDone.mutate({
										id: todo.id,
										done: !todo.done,
									});
								}}
							/>
							<label
								htmlFor={`check-${todo.id}`}
								className={
									todo.done
										? "line-through text-gray-600"
										: ""
								}>
								{todo.content}
							</label>
							<button
								onClick={() => {
									removeTodo.mutate({ id: todo.id });
								}}
								className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full text-sm px-2">
								Delete
							</button>
						</div>
					))
				) : (
					<div className="text-center">
						No tasks yet. You can start adding some!
					</div>
				)}
			</div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (content.length) {
						addTodo.mutate(content);
						setContent("");
					}
				}}
				className="flex gap-3 items-center">
				<label htmlFor="content">Content</label>
				<input
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
				/>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
					Add Todo
				</button>
			</form>
		</>
	);
}
