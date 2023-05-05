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
    const result = await createCardService(card, boardId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
    }
  },
  async onUpdateCard(card: ICardForUpdate, cardId: string, boardId: string) {
    const result = await updateCardService(card, cardId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      notiSuccess("Tarjeta actualizada.");
    } else {
      notiError("Error al actualizar la tarjeta.");
    }
  },
  async onDeleteCard(cardId: string, boardId: string) {
    const result = await removeCardService(cardId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      notiSuccess("Tarjeta eliminada con exito.");
    } else {
      notiError("Error al eliminar la tarjeta.");
    }
  },
  onToggleCardDragging(newValue: boolean) {
    set(() => ({
      isCardDragging: newValue,
    }));
  },
  onToggleCardModal(card: ICard | undefined) {
    set(() => ({
      cardModal: card,
    }));
  },
}));
