import type { Api } from "../trpc/serverClient";

export type TodoList = Awaited<ReturnType<Api["Todos"]["get"]>>;
