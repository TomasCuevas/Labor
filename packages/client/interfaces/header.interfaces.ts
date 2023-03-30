export interface IHeaderState {
  createMenu: boolean;
  accountMenu: boolean;
  createMenuState: CreateMenuState;
}

export type CreateMenuState = "nothing" | "board";
