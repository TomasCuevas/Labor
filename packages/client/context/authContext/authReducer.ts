//* interfaces *//
import { IAuthState } from "../../interfaces";

export interface AuthActions {
  type: "login" | "logout" | "checking";
  payload: IAuthState;
}

export const authReducer = (
  state: IAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        ...action.payload,
        status: "authenticated",
      };

    case "logout":
      return {
        ...state,
        ...action.payload,
        status: "not-authenticated",
      };

    case "checking":
      return {
        ...state,
        ...action.payload,
        status: "checking",
      };

    default:
      return state;
  }
};
