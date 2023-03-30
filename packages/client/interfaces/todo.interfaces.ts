import { IBoard } from "./board.interfaces";

export interface ITodo {
  board: IBoard;
  description?: string;
  id: string;
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
