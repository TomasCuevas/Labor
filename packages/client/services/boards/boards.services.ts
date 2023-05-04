//* axios *//
import { boardsApi } from "../../api";

//* interfaces *//
import { IBoard, IBoardForCreate, IBoardForUpdate } from "../../interfaces";

//! create board service
export const createBoardService = async (
  board: IBoardForCreate
): Promise<{ ok: boolean; board?: IBoard }> => {
  try {
    const { data } = await boardsApi.post("/create", board);

    return {
      ok: true,
      board: data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
};

//! update board service
export const updateBoardService = async (
  boardId: string,
  board: IBoardForUpdate
): Promise<{ ok: boolean; board?: IBoard }> => {
  try {
    const { data } = await boardsApi.patch(`/update/${boardId}`, board);

    return {
      ok: true,
      board: data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
};

//! get all boards service
export const getAllBoardsService = async (): Promise<IBoard[]> => {
  try {
    const { data } = await boardsApi.get("/all");

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los tableros.");
  }
};

//! get board by name service
export const getBoardByName = async (
  boardName: string
): Promise<{ ok: boolean; board?: IBoard }> => {
  try {
    const { data } = await boardsApi.get(`/${boardName}`);

    return {
      ok: true,
      board: data,
    };
  } catch (error: any) {
    console.error(error);
    return { ok: false };
  }
};

//! delete board
export const deleteBoard = async (boardId: string) => {
  try {
    const { data } = await boardsApi.delete(`/delete/${boardId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
};
