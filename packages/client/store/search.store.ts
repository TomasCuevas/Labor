import { create } from "zustand";

//* service *//
import { searchAll } from "@/services";

//* interface *//
import { ISearch } from "@/interfaces";

export const useSearchStore = create<ISearch>((set) => ({
  boards: [],
  cards: [],
  async onSearch(search: string) {
    try {
      const result = await searchAll(search);
      set((state) => ({
        ...state,
        boards: result.boards,
        cards: result.cards,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        boards: [],
        cards: [],
      }));
    }
  },
  clearData() {
    set(() => ({
      boards: [],
      cards: [],
    }));
  },
}));
