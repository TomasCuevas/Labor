import { IBoard } from "./board.interfaces";

export interface ICard {
  board: IBoard;
  description?: string;
  id: string;
  lastUpdate: number;
  status: ICardStatus;
  title: string;
}

export interface ICardForCreate {
  status: ICardStatus;
  title: string;
}

export interface ICardForUpdate {
  description?: string;
  status?: ICardStatus;
  title?: string;
}

export type ICardStatus = "pending" | "in-progress" | "completed";
