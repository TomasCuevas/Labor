import { create } from "zustand";

//* interface *//
import { CreateMenuState, IHeader, MenuOpen } from "../interfaces";

interface useHeaderState extends IHeader {
  onChangeMenuOpen(menu: MenuOpen): void;
  onChangeCreateMenuState(state: CreateMenuState): void;
}

export const useHeaderStore = create<useHeaderState>((set) => ({
  menuOpen: "nothing",
  createMenuState: "nothing",
  onChangeMenuOpen(menu: MenuOpen) {
    set(() => ({
      menuOpen: menu,
      createMenuState: "nothing",
    }));
  },
  onChangeCreateMenuState(state: CreateMenuState) {
    set(() => ({
      createMenuState: state,
    }));
  },
}));
