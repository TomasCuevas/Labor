import { useQuery } from "@tanstack/react-query";

//* service *//
import { getAllCardsByBoardService } from "@/services";

//* interfaces *//
import { ICard } from "@/interfaces";

interface Return {
  isLoading: boolean;
  cards: ICard[];
}

export const useCards = (boardId: string): Return => {
  const { data: cards, isLoading } = useQuery(
    [`/boards/${boardId}/todos`],
    () => getAllCardsByBoardService(boardId)
  );

  return {
    isLoading,
    cards: cards || [],
  };
};
