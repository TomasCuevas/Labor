//* axios instance *//
import { searchApi } from "../../api";

//* interfaces *//
import { IBoard, ICard } from "../../interfaces";

//! search all services
export const searchAll = async (
  search: string
): Promise<{ ok: boolean; boards?: IBoard[]; cards?: ICard[] }> => {
  const { data } = await searchApi.get(`/all/${search}`);

  try {
    return {
      ok: true,
      boards: data.boards || [],
      cards: data.cards || [],
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
