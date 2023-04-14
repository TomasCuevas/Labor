export interface IHeader {
  menuOpen: MenuOpen;
  createMenuState: CreateMenuState;
}

export type CreateMenuState = "nothing" | "board";

export type MenuOpen = "account" | "create" | "search" | "nothing";
