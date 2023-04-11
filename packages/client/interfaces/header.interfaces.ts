export interface IHeader {
  accountMenu: boolean;
  createMenu: boolean;
  searchMenu: boolean;
  createMenuState: CreateMenuState;
}

export type CreateMenuState = "nothing" | "board";
