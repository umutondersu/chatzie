"use client";

import type { TodoList } from "@/types";
import type { trpc } from "@/app/_trpc/client";

export const OptimisticMutationHelper = async (
	TodosQuery: ReturnType<typeof trpc.useUtils>["Todos"]["get"],
	updateFunc: (todos: TodoList) => TodoList
): Promise<{ previousTodos: TodoList | undefined }> => {
	await TodosQuery.cancel();
	const previousTodos = TodosQuery.getData();
	TodosQuery.setData(undefined, (prevstate) => updateFunc(prevstate!));

	return { previousTodos };
};
