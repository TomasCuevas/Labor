//* axios instance *//
import { searchApi } from "@/axios";

//* interfaces *//
import { IBoard, ICard } from "@/interfaces";

//! search all [services]
export const searchAll = async (
  search: string
): Promise<{ boards: IBoard[]; cards: ICard[] }> => {
  try {
    const { data } = await searchApi.get(`/all/${search}`);

    return {
      boards: data.boards,
      cards: data.cards,
    };
  } catch (error) {
    throw error;
  }
};
