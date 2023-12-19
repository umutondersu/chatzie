"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import type { TodoList } from "@/definitions";
import OptimisticMutationHelper from "@/utils/OptimisticMutationHelper";

export default function TodoList({ initialTodos }: { initialTodos: TodoList }) {
	const queryClient = useQueryClient();
	const Todos = trpc.Todos.get.useQuery(undefined, {
		initialData: initialTodos,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const todosQueryKey = getQueryKey(trpc.Todos.get, undefined, "query");
	const QueryContext = { todosQueryKey, queryClient };

	const addTodo = trpc.Todos.add.useMutation({
		onMutate: async (newTodo) =>
			OptimisticMutationHelper(QueryContext, (prevstate) => [
				...prevstate,
				{
					id: "OPTIMISTIC_ID",
					done: false,
					content: newTodo,
					userid: "OPTIMISTIC_USERID",
				},
			]),
		onError: (_error, _newTodo, context) => {
			queryClient.setQueryData(todosQueryKey, context!.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries(todosQueryKey);
		},
	});

	const setDone = trpc.Todos.setDone.useMutation({
		onMutate: async ({ id, done }) =>
			OptimisticMutationHelper(QueryContext, (prevstate) =>
				prevstate.map((todo) =>
					todo.id === id ? { ...todo, done: !done } : todo
				)
			),
		onError: (error, _newTodo, context) => {
			alert(error.message);
			queryClient.setQueryData(todosQueryKey, context!.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries(todosQueryKey);
		},
	});

	const removeTodo = trpc.Todos.remove.useMutation({
		onMutate: async (newTodo) =>
			OptimisticMutationHelper(QueryContext, (prevstate) =>
				prevstate.filter((todo) => todo.id !== newTodo)
			),
		onError: (_error, _newTodo, context) => {
			queryClient.setQueryData(todosQueryKey, context!.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries(todosQueryKey);
		},
	});

	const [content, setContent] = useState("");

	return (
		<div>
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
										done: todo.done ? false : true,
									});
								}}
							/>
							<label htmlFor={`check-${todo.id}`}>
								{todo.content}
							</label>
							<button
								onClick={() => {
									removeTodo.mutate(todo.id);
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
			<div className="flex gap-3 items-center">
				<label htmlFor="content">Content</label>
				<input
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
				/>
				<button
					onClick={async () => {
						if (content.length) {
							addTodo.mutate(content);
							setContent("");
						}
					}}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
					Add Todo
				</button>
			</div>
		</div>
	);
}
