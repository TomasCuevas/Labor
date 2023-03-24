import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

//* interfaces *//
import { IBoard } from "../../interfaces";

//* services *//
import { createBoardService, getAllBoardsService } from "../../services";

//* CONTEXT *//
//* CONTEXT *//
interface BoardsContextProps {
  boards?: IBoard[];
  isLoading: boolean;
  onCreateBoard(name: string): Promise<boolean>;
}

export const BoardsContext = createContext({} as BoardsContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface BoardsProviderProps {
  children: React.ReactNode;
}

export const BoardsProvider: React.FC<BoardsProviderProps> = ({ children }) => {
  const {
    data: boards,
    isLoading,
    refetch,
  } = useQuery(["boards"], () => getAllBoardsService());

  //! create board
  const onCreateBoard = async (name: string) => {
    const result = await createBoardService(name);

    if (result.ok) {
      refetch();
      return true;
    } else {
      return false;
    }
  };

  return (
    <BoardsContext.Provider
      value={{
        //? getters
        boards,
        isLoading,

        //? methods
        onCreateBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};
