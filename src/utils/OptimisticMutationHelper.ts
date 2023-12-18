"use client";

import type { TodoList } from "@/definitions";
import { QueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

type nullableTodoList = TodoList | undefined;
const OptimisticMutationHelper = async (
	{
		queryClient,
		todosQueryKey,
	}: {
		queryClient: QueryClient;
		todosQueryKey: ReturnType<typeof getQueryKey>;
	},
	updateFunc: (todos: TodoList) => TodoList
) => {
	await queryClient.cancelQueries(todosQueryKey);
	const previousTodos: nullableTodoList =
		queryClient.getQueryData(todosQueryKey);

	queryClient.setQueryData(todosQueryKey, (prevstate: nullableTodoList) =>
		updateFunc(prevstate!)
	);
	return { previousTodos };
};

export default OptimisticMutationHelper;
