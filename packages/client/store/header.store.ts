import { create } from "zustand";

//* interfaces *//
import { CreateMenuState, IHeader, MenuOpen } from "@/interfaces";

interface useHeaderState extends IHeader {
  onChangeMenuOpen(menu: MenuOpen): void;
  onChangeCreateMenuState(state: CreateMenuState): void;
}

export const useHeaderStore = create<useHeaderState>((set) => ({
  menuOpen: "nothing",
  createMenuState: "nothing",

  //! change menu open
  onChangeMenuOpen(menu: MenuOpen) {
    set(() => ({
      menuOpen: menu,
      createMenuState: "nothing",
    }));
  },

  //! change create menu state
  onChangeCreateMenuState(state: CreateMenuState) {
    set(() => ({
      createMenuState: state,
    }));
  },
}));
