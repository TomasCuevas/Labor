import { create } from "zustand";

//* queryClient *//
import { queryClient } from "@/pages/_app";

//* util *//
import { notiError } from "@/utils";

//* services *//
import {
  createBoardService,
  deleteBoard,
  updateBoardService,
} from "@/services";

//* interfaces *//
import { IBoard, IBoardForCreate, IBoardForUpdate } from "@/interfaces";

interface useBoardsState {
  onCreateBoard(board: IBoardForCreate): Promise<IBoard>;
  onUpdateBoard(boardId: string, board: IBoardForUpdate): Promise<IBoard>;
  onDeleteBoard(boardId: string): Promise<void>;
}

export const useBoardsStore = create<useBoardsState>(() => ({
  //! create board
  async onCreateBoard(boardData: IBoardForCreate) {
    try {
      const board = await createBoardService(boardData);
      queryClient.invalidateQueries(["/boards"]);
      return board;
    } catch (error: any) {
      notiError(error.response.data.message || "Error al crear el tablero.");
      throw error;
    }
  },

  //! update board
  async onUpdateBoard(boardId: string, boardData: IBoardForUpdate) {
    try {
      const board = await updateBoardService(boardId, boardData);
      queryClient.invalidateQueries(["/boards"]);
      queryClient.invalidateQueries(["/boards/closed"]);
      return board;
    } catch (error: any) {
      notiError(
        error.response.data.message || "Error al actualizar el tablero."
      );
      throw error;
    }
  },

  //! delete board
  async onDeleteBoard(boardId: string) {
    try {
      await deleteBoard(boardId);
      queryClient.invalidateQueries(["/boards"]);
      queryClient.invalidateQueries(["/boards/closed"]);
    } catch (error: any) {
      notiError(error.response.data.message || "Error al eliminar el tablero.");
      throw error;
    }
  },
}));
