"use client";

import React, { useState } from "react";
import type { Api } from "../_trpc/serverClient";
import { trpc } from "../_trpc/client";

export default function TodoList({
	initialTodos,
}: {
	initialTodos: Awaited<ReturnType<Api["Todos"]["get"]>>;
}) {
	const getTodos = trpc.Todos.get.useQuery(undefined, {
		initialData: initialTodos,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
	const addTodo = trpc.Todos.add.useMutation({
		onSettled: () => {
			getTodos.refetch();
		},
	});
	const setDone = trpc.Todos.setDone.useMutation({
		onSettled: () => {
			getTodos.refetch();
		},
	});

	const removeTodo = trpc.Todos.remove.useMutation({
		onSettled: () => {
			getTodos.refetch();
		},
		onError: (error) => {
			alert(error.message);
		},
	});

	const [content, setContent] = useState("");

	return (
		<div>
			<div className="text-black my-5 text-3xl">
				{getTodos.data.map((todo) => (
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
				))}
			</div>
			<div className="flex gap-3 items-center">
				<label htmlFor="content">Content</label>
				<input
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
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
