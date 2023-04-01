import { createContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

//* services *//
import { createBoardService } from "../../services";

//* CONTEXT *//
//* CONTEXT *//
interface BoardsContextProps {
  onCreateBoard(name: string): Promise<boolean>;
}

export const BoardsContext = createContext({} as BoardsContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface BoardsProviderProps {
  children: React.ReactNode;
}

export const BoardsProvider: React.FC<BoardsProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  //! create board
  const onCreateBoard = async (name: string): Promise<boolean> => {
    const result = await createBoardService(name);

    if (result.ok) {
      queryClient.invalidateQueries(["/boards"]);
      return true;
    } else {
      return false;
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        //? methods
        onCreateBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};
