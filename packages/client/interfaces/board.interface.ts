//* interfaces *//
import { IUser } from "./";

export interface IBoardState {
  boards: IBoard[];
}

export interface IBoard {
  id: string;
  user: IUser;
  name: string;
  status: IBoardStaus;
}

type IBoardStaus = "open" | "closed";
