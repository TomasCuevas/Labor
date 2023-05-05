//* axios instance *//
import { boardsApi, cardsApi } from "@/api";

//* interfaces *//
import { ICard, ICardForCreate, ICardForUpdate } from "@/interfaces";

//! create card [service]
export const createCardService = async (
  card: ICardForCreate,
  boardId: string
): Promise<{ ok: boolean; card?: ICard }> => {
  try {
    const { data } = await cardsApi.post("/create", { ...card, boardId });

    return {
      ok: true,
      card: data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
    };
  }
};

//! get all cards by board [service]
export const getAllCardsByBoardService = async (
  boardId: string
): Promise<ICard[]> => {
  try {
    const { data } = await boardsApi.get(`/${boardId}/cards`);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las tareas del tablero.");
  }
};

//! update card [service]
export const updateCardService = async (
  cardToUpdate: ICardForUpdate,
  cardId: string
): Promise<{ ok: boolean; todo?: ICard }> => {
  try {
    const { data } = await cardsApi.patch(`/update/${cardId}`, cardToUpdate);

    return {
      ok: true,
      todo: data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
    };
  }
};

//! remove card [service]
export const removeCardService = async (cardId: string) => {
  try {
    await cardsApi.delete(`/delete/${cardId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
