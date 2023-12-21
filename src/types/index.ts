import type { Api } from "../app/_trpc/serverClient";

export type TodoList = Awaited<ReturnType<Api["Todos"]["get"]>>;
