import { create } from "zustand";

//* utils *//
import { notiError, notiSuccess } from "@/utils/notistack.utils";

//* services *//
import {
  createCardService,
  removeCardService,
  updateCardService,
} from "@/services";

//* queryClient *//
import { queryClient } from "@/pages/_app";

//* interfaces *//
import { ICard, ICardForCreate, ICardForUpdate } from "@/interfaces";

interface useCardState {
  isCardDragging: boolean;
  cardModal: ICard | undefined;
  onCreateCard(card: ICardForCreate, boardId: string): Promise<void>;
  onUpdateCard(
    card: ICardForUpdate,
    cardId: string,
    boardId: string
  ): Promise<void>;
  onDeleteCard(cardId: string, boardId: string): Promise<void>;
  onToggleCardDragging(newValue: boolean): void;
  onToggleCardModal(card: ICard | undefined): void;
}

export const useCardsStore = create<useCardState>((set) => ({
  isCardDragging: false,
  cardModal: undefined,
  async onCreateCard(card: ICardForCreate, boardId: string) {
    try {
      await createCardService(card, boardId);
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
    } catch (error: any) {
      notiError(error.response.data.message[0] || "Error al crear la tarjeta.");
      throw error;
    }
  },
  async onUpdateCard(card: ICardForUpdate, cardId: string, boardId: string) {
    try {
      await updateCardService(card, cardId);
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      notiSuccess("Tarjeta actualizada con exito.");
    } catch (error: any) {
      notiError(
        error.response.data.message[0] || "Error al actualizar la tarjeta."
      );
      throw error;
    }
  },
  async onDeleteCard(cardId: string, boardId: string) {
    try {
      await removeCardService(cardId);
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      notiSuccess("Tarjeta eliminada con exito.");
    } catch (error: any) {
      notiError(
        error.response.data.message[0] || "Error al eliminar la tarjeta."
      );
      throw error;
    }
  },
  onToggleCardDragging(newValue: boolean) {
    set(() => ({ isCardDragging: newValue }));
  },
  onToggleCardModal(card: ICard | undefined) {
    set(() => ({ cardModal: card }));
  },
}));
