//* interfaces *//
import { IUser, IBoard } from "./";

export interface ICard {
  board: IBoard;
  description?: string;
  id: string;
  labels: string[];
  lastUpdate: number;
  status: ICardStatus;
  title: string;
  user: IUser;
}

export interface ICardForCreate {
  status: ICardStatus;
  title: string;
}

export interface ICardForUpdate {
  description?: string;
  labels?: string[];
  status?: ICardStatus;
  title?: string;
}

export type ICardStatus = "pending" | "in-progress" | "completed";
