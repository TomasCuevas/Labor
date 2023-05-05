//* interfaces *//
import { IBoard, ICard } from "@/interfaces";

export interface ISearch {
  cards?: ICard[];
  boards?: IBoard[];
  onSearch(search: string): void;
  clearData(): void;
}
