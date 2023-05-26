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
  cardModal?: ICard;
  onCreateCard(card: ICardForCreate, boardId: string): Promise<void>;
  onUpdateCard(
    card: ICardForUpdate,
    cardId: string,
    boardId: string
  ): Promise<void>;
  onDeleteCard(cardId: string, boardId: string): Promise<void>;
  onToggleCardDragging(newValue: boolean): void;
  onToggleCardModal(card?: ICard): void;
}

export const useCardsStore = create<useCardState>((set) => ({
  isCardDragging: false,
  cardModal: undefined,

  //! create card
  async onCreateCard(card: ICardForCreate, boardId: string) {
    try {
      await createCardService(card, boardId);
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
    } catch (error: any) {
      notiError(error.response.data.message[0] || "Error al crear la tarjeta.");
      throw error;
    }
  },

  //! update card
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

  //! delete card
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

  //! toggle card dragging
  onToggleCardDragging(newValue: boolean) {
    set(() => ({ isCardDragging: newValue }));
  },

  //! toggle card modal
  onToggleCardModal(card: ICard | undefined) {
    set(() => ({ cardModal: card }));
  },
}));
