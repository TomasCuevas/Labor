import { create } from "zustand";

//* services *//
import { searchAll } from "../services";

//* interfaces *//
import { ISearch } from "../interfaces";

export const useSearchStore = create<ISearch>((set) => ({
  boards: [],
  cards: [],
  async onSearch(search: string) {
    const result = await searchAll(search);
    if (!result.ok) return;

    set((state) => ({
      ...state,
      boards: result.boards,
      cards: result.cards,
    }));
  },
  clearData() {
    set(() => ({
      boards: [],
      cards: [],
    }));
  },
}));
