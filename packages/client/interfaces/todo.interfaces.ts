export interface ITodo {
  _id: string;
  description: string;
  status: ITodoStatus;
  lastUpdate: number;
}

export type ITodoStatus = "pending" | "in-progress" | "completed";
