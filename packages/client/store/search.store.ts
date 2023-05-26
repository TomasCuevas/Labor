import { create } from "zustand";

//* service *//
import { searchAll } from "@/services";

//* interface *//
import { ISearch } from "@/interfaces";

export const useSearchStore = create<ISearch>((set) => ({
  boards: [],
  cards: [],

  //! search
  async onSearch(search: string) {
    try {
      const result = await searchAll(search);
      set(() => ({ boards: result.boards, cards: result.cards }));
    } catch (error) {
      set(() => ({ boards: [], cards: [] }));
    }
  },

  //! clear data
  clearData() {
    set(() => ({
      boards: [],
      cards: [],
    }));
  },
}));
