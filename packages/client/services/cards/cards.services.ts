//* axios instance *//
import { boardsApi, cardsApi } from "@/axios";

//* interfaces *//
import { ICard, ICardForCreate, ICardForUpdate } from "@/interfaces";

//! create card [service]
export const createCardService = async (
  card: ICardForCreate,
  boardId: string
): Promise<ICard> => {
  try {
    const { data } = await cardsApi.post("/create", { ...card, boardId });

    return data;
  } catch (error: any) {
    throw error;
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
    throw error;
  }
};

//! update card [service]
export const updateCardService = async (
  cardToUpdate: ICardForUpdate,
  cardId: string
): Promise<ICard> => {
  try {
    const { data } = await cardsApi.patch(`/update/${cardId}`, cardToUpdate);

    return data;
  } catch (error: any) {
    throw error;
  }
};

//! remove card [service]
export const removeCardService = async (cardId: string) => {
  try {
    await cardsApi.delete(`/delete/${cardId}`);
  } catch (error) {
    throw error;
  }
};
