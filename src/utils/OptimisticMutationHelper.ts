"use client";

import type { TodoList } from "@/definitions";
import type { trpc } from "@/app/_trpc/client";

const OptimisticMutationHelper = async (
	TodosQuery: ReturnType<typeof trpc.useUtils>["Todos"]["get"],
	updateFunc: (todos: TodoList) => TodoList
): Promise<{ previousTodos: TodoList | undefined }> => {
	await TodosQuery.cancel();
	const previousTodos = TodosQuery.getData();
	TodosQuery.setData(undefined, (prevstate) => updateFunc(prevstate!));

	return { previousTodos };
};

export default OptimisticMutationHelper;
