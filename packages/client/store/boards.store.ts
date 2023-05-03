import { create } from "zustand";

//* queryClient *//
import { queryClient } from "../pages/_app";

//* utils *//
import { notiError } from "../utils";

//* services *//
import {
  createBoardService,
  deleteBoard,
  updateBoardService,
} from "../services";

//* interface *//
import { IBoard, IBoardForCreate, IBoardForUpdate } from "../interfaces";

interface useBoardsState {
  onCreateBoard(
    board: IBoardForCreate
  ): Promise<{ ok: boolean; board?: IBoard }>;
  onUpdateBoard(
    boardId: string,
    board: IBoardForUpdate
  ): Promise<{ ok: boolean; board?: IBoard }>;
  onDeleteBoard(boardId: string): Promise<{ ok: boolean }>;
}

export const useBoardsStore = create<useBoardsState>(() => ({
  async onCreateBoard(board: IBoardForCreate) {
    const result = await createBoardService(board);
    if (result.ok) {
      queryClient.invalidateQueries(["/boards"]);
      return {
        ok: true,
        board: result.board,
      };
    } else {
      return {
        ok: false,
      };
    }
  },
  async onUpdateBoard(boardId: string, board: IBoardForUpdate) {
    const result = await updateBoardService(boardId, board);
    if (result.ok) {
      queryClient.invalidateQueries(["/boards"]);
      return {
        ok: true,
        board: result.board,
      };
    } else {
      notiError("Error al actualizar el tablero.");
      return {
        ok: false,
      };
    }
  },
  async onDeleteBoard(boardId: string) {
    const result = await deleteBoard(boardId);

    if (result.ok) {
      queryClient.invalidateQueries(["/boards"]);
      return {
        ok: true,
      };
    } else {
      notiError("Error al eliminar el tablero.");
      return {
        ok: false,
      };
    }
  },
}));
