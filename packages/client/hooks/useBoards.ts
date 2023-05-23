import { useQuery } from "@tanstack/react-query";

//* service *//
import { getAllClosedBoards, getAllOpenBoardsService } from "@/services";

//* interfaces *//
import { IBoard } from "@/interfaces";

interface Return {
  boards: IBoard[];
  closedBoards: IBoard[];
  isLoading: boolean;
}

export const useBoards = (): Return => {
  const { data: boards = [], isLoading } = useQuery(["/boards"], () =>
    getAllOpenBoardsService()
  );
  const { data: closedBoards = [] } = useQuery(["/boards/closed"], () =>
    getAllClosedBoards()
  );

  return {
    boards,
    closedBoards,
    isLoading,
  };
};
