"use client";
import React from "react";
import { api } from "../_trpc/serverClient";
import { trpc } from "../_trpc/client";

export default async function Todolist({
	initialTodos,
}: {
	initialTodos: Awaited<ReturnType<(typeof api)["Todos"]["get"]>>;
}) {
	const getTodos = trpc.Todos.get.useQuery(undefined, {
		initialData: initialTodos,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	return <div>{JSON.stringify(getTodos.data)}</div>;
}
