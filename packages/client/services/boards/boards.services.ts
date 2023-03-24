//* axios *//
import { boardsApi } from "../../api";

//* interfaces *//
import { IBoard } from "../../interfaces";

//! create board service
export const createBoardService = async (name: string) => {
  try {
    const { data } = await boardsApi.post("/create", { name });

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.log(error);
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
    console.log(error);
    throw new Error("Error al obtener los tableros.");
  }
};
