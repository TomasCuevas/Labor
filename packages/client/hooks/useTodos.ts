import { useQuery } from "@tanstack/react-query";

//* services *//
import { getAllTodosByBoardService } from "../services";

//* interfaces *//
import { ITodo } from "../interfaces";

interface Return {
  isLoading: boolean;
  todos: ITodo[];
}

export const useTodos = (boardId: string): Return => {
  const { data: todos, isLoading } = useQuery(
    [`/boards/${boardId}/todos`],
    () => getAllTodosByBoardService(boardId)
  );

  return {
    isLoading,
    todos: todos || [],
  };
};
