import { useQuery } from "@tanstack/react-query";

//* service *//
import { getAllBoardsService } from "@/services";

//* interfaces *//
import { IBoard } from "@/interfaces";

interface Return {
  boards?: IBoard[];
  isLoading: boolean;
}

export const useBoards = (): Return => {
  const { data: boards, isLoading } = useQuery(["/boards"], () =>
    getAllBoardsService()
  );

  return {
    boards,
    isLoading,
  };
};
