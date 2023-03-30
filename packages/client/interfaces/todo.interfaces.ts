export interface ITodo {
  id: string;
  description?: string;
  lastUpdate: number;
  status: ITodoStatus;
  title: string;
}

export interface ITodoForCreate {
  status: ITodoStatus;
  title: string;
}

export interface ITodoForUpdate {
  description?: string;
  status?: ITodoStatus;
  title?: string;
}

export type ITodoStatus = "pending" | "in-progress" | "completed";
