//* interfaces *//
import { CreateMenuState, IHeader } from "../../interfaces";

export interface HeaderActions {
  type: "account" | "create" | "search" | "closeAll" | CreateMenuState;
}

export const headerReducer = (
  state: IHeader,
  action: HeaderActions
): IHeader => {
  switch (action.type) {
    case "account":
      return {
        accountMenu: true,
        createMenu: false,
        searchMenu: false,
        createMenuState: "nothing",
      };

    case "create":
      return {
        accountMenu: false,
        createMenu: true,
        searchMenu: false,
        createMenuState: "nothing",
      };

    case "search":
      return {
        accountMenu: false,
        createMenu: false,
        searchMenu: true,
        createMenuState: "nothing",
      };

    case "closeAll":
      return {
        accountMenu: false,
        createMenu: false,
        searchMenu: false,
        createMenuState: "nothing",
      };

    case "nothing":
      return {
        ...state,
        createMenuState: "nothing",
      };

    case "board":
      return {
        ...state,
        createMenuState: "board",
      };

    default:
      return state;
  }
};
