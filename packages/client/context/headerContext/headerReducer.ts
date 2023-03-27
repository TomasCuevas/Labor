//* interfaces *//
import { CreateMenuState, IHeaderState } from "../../interfaces";

export interface HeaderActions {
  type: "account" | "create" | "closeAll" | CreateMenuState;
}

export const headerReducer = (
  state: IHeaderState,
  action: HeaderActions
): IHeaderState => {
  switch (action.type) {
    case "account":
      return {
        createMenu: false,
        accountMenu: true,
        createMenuState: "nothing",
      };

    case "create":
      return {
        createMenu: true,
        accountMenu: false,
        createMenuState: "nothing",
      };

    case "closeAll":
      return {
        createMenu: false,
        accountMenu: false,
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
