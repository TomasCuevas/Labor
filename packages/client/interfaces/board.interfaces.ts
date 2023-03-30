//* interfaces *//
import { IUser } from ".";

export interface IBoard {
  id: string;
  user: IUser;
  name: string;
  status: IBoardStaus;
  lastUpdate: number;
}

type IBoardStaus = "open" | "closed";
