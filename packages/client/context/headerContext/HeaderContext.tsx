import { createContext, useReducer } from "react";

//* interfaces *//
import { CreateMenuState, IHeader } from "../../interfaces";

//* reducer *//
import { headerReducer } from "./headerReducer";

//* CONTEXT *//
//* CONTEXT *//
interface HeaderContextProps extends IHeader {
  setAccountPop(): void;
  setCreatePop(): void;
  setSearchPop(): void;
  closeAllPops(): void;
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
    accountMenu: false,
    createMenu: false,
    searchMenu: false,
    createMenuState: "nothing",
  });

  //! set account pop
  const setAccountPop = () => dispatch({ type: "account" });

  //! set create pop
  const setCreatePop = () => dispatch({ type: "create" });

  //! set search pop
  const setSearchPop = () => dispatch({ type: "search" });

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
        setAccountPop,
        setCreatePop,
        setSearchPop,
        closeAllPops,
        onChangeCreateMenuState,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
