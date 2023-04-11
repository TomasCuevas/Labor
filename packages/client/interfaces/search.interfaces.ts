//* interfaces *//
import { IBoard, ICard } from "./";

export interface ISearch {
  cards?: ICard[];
  boards?: IBoard[];
  onSearch(search: string): void;
  clearData(): void;
}
