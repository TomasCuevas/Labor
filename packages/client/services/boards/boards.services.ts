//* axios instance *//
import { boardsApi } from "@/axios";

//* interfaces *//
import { IBoard, IBoardForCreate, IBoardForUpdate } from "@/interfaces";

//! create board [service]
export const createBoardService = async (
  board: IBoardForCreate
): Promise<IBoard> => {
  try {
    const { data } = await boardsApi.post("/create", board);

    return data;
  } catch (error) {
    throw error;
  }
};

//! update board [service]
export const updateBoardService = async (
  boardId: string,
  board: IBoardForUpdate
): Promise<IBoard> => {
  try {
    const { data } = await boardsApi.patch(`/update/${boardId}`, board);

    return data;
  } catch (error) {
    throw error;
  }
};

//! get all open boards [service]
export const getAllOpenBoardsService = async (): Promise<IBoard[]> => {
  try {
    const { data } = await boardsApi.get("/all/open");

    return data;
  } catch (error) {
    throw error;
  }
};

//! get board by name [service]
export const getBoardByName = async (boardName: string): Promise<IBoard> => {
  try {
    const { data } = await boardsApi.get(`/${boardName}`);

    return data;
  } catch (error) {
    throw error;
  }
};

//! get all closed boards [service]
export const getAllClosedBoards = async (): Promise<IBoard[]> => {
  try {
    const { data } = await boardsApi.get("/all/closed");

    return data;
  } catch (error) {
    throw error;
  }
};

//! delete board [service]
export const deleteBoard = async (boardId: string) => {
  try {
    await boardsApi.delete(`/delete/${boardId}`);

    return;
  } catch (error) {
    throw error;
  }
};
