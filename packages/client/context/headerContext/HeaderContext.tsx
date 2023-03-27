import { createContext, useReducer } from "react";

//* interfaces *//
import { CreateMenuState, IHeaderState } from "../../interfaces";

//* reducer *//
import { headerReducer } from "./headerReducer";

//* CONTEXT *//
//* CONTEXT *//
interface HeaderContextProps extends IHeaderState {
  closeAllPops(): void;
  setCreatePop(): void;
  setAccountPop(): void;
  onChangeCreateMenuState(state: CreateMenuState): void;
}

export const HeaderContext = createContext({} as HeaderContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface HeaderProviderProps {
  children: React.ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerStatus, dispatch] = useReducer(headerReducer, {
    createMenu: false,
    accountMenu: false,
    createMenuState: "nothing",
  });

  //! set account pop
  const setAccountPop = () => dispatch({ type: "account" });

  //! set create pop
  const setCreatePop = () => dispatch({ type: "create" });

  //! close all pop
  const closeAllPops = () => dispatch({ type: "closeAll" });

  //! change create menu state
  const onChangeCreateMenuState = (state: CreateMenuState) => {
    dispatch({ type: state });
  };

  return (
    <HeaderContext.Provider
      value={{
        //? getters
        ...headerStatus,

        //? methods
        closeAllPops,
        setCreatePop,
        setAccountPop,
        onChangeCreateMenuState,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
