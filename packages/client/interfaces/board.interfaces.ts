//* interfaces *//
import { IUser } from "@/interfaces";

export interface IBoard {
  background: string;
  description: string;
  id: string;
  lastUpdate: number;
  name: string;
  status: IBoardStaus;
  user: IUser;
}

export interface IBoardForCreate {
  name: string;
}

export interface IBoardForUpdate {
  background?: string;
  description?: string;
  name?: string;
  status?: IBoardStaus;
}

type IBoardStaus = "open" | "closed";
