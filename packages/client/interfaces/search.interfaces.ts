//* interfaces *//
import { IBoard, ITodo } from "./";

export interface ISearch {
  cards?: ITodo[];
  boards?: IBoard[];
}
