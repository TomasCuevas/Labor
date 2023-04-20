import { create } from "zustand";

//* queryClient *//
import { queryClient } from "../pages/_app";

//* utils *//
import { notiError, notiSuccess } from "../utils";

//* services *//
import { createBoardService, updateBoardService } from "../services";

//* interface *//
import { IBoard, IBoardForCreate, IBoardForUpdate } from "../interfaces";

interface useBoardsState {
  onCreateBoard(board: IBoardForCreate): Promise<boolean>;
  onUpdateBoard(
    boardId: string,
    board: IBoardForUpdate
  ): Promise<{ ok: boolean; board?: IBoard }>;
}

export const useBoardsStore = create<useBoardsState>(() => ({
  async onCreateBoard(board: IBoardForCreate) {
    const result = await createBoardService(board);
    if (result.ok) {
      queryClient.invalidateQueries(["/boards"]);
      return true;
    } else {
      return false;
    }
  },
  async onUpdateBoard(boardId: string, board: IBoardForUpdate) {
    const result = await updateBoardService(boardId, board);
    if (result.ok) {
      notiSuccess("Descripción actualizada.");
      return {
        ok: true,
        board: result.board,
      };
    } else {
      notiError("Error al actualizar la descripción.");
      return {
        ok: false,
      };
    }
  },
}));
