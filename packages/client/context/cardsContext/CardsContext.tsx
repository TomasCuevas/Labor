import { createContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

//* services *//
import {
  createCardService,
  removeCardService,
  updateCardService,
} from "../../services";

//* interfaces
import { ICard, ICardForCreate, ICardForUpdate } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//
interface CardsContextProps {
  isCardDragging: boolean;
  cardModal: ICard | undefined;
  onCreateCard(todo: ICardForCreate, boardId: string): Promise<void>;
  onToggleCardDragging(newValue: boolean): void;
  onDeleteCard(todoId: string, boardId: string): Promise<void>;
  onUpdateCard(
    cardToUpdate: ICardForUpdate,
    cardId: string,
    boardId: string
  ): Promise<void>;
  onClearCardModal(): void;
  onSetCardModal(card: ICard): void;
}

export const CardContext = createContext({} as CardsContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface Props {
  children: React.ReactNode;
}

export const CardProvider: React.FC<Props> = ({ children }) => {
  const [isCardDragging, setIsCardDragging] = useState<boolean>(false);
  const [cardModal, setCardModal] = useState<ICard>();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  //! toggle dragging
  const onToggleCardDragging = (newValue: boolean) => {
    return setIsCardDragging(newValue);
  };

  //! set card on popup
  const onSetCardModal = (todo: ICard) => setCardModal(todo);

  //! clear card on popup
  const onClearCardModal = () => setCardModal(undefined);

  //! create card
  const onCreateCard = async (
    card: ICardForCreate,
    boardId: string
  ): Promise<void> => {
    const result = await createCardService(card, boardId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
    }
  };

  //! update card
  const onUpdateCard = async (
    cardToUpdate: ICardForUpdate,
    cardId: string,
    boardId: string
  ) => {
    const result = await updateCardService(cardToUpdate, cardId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      enqueueSnackbar("Tarjeta actualizada", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar("Error al actualizar la tarjeta.", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  //! delete card
  const onDeleteCard = async (cardId: string, boardId: string) => {
    const result = await removeCardService(cardId);

    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      enqueueSnackbar("Tarjeta eliminada con exito.", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar("Error al eliminar la tarjeta.", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <CardContext.Provider
      value={{
        //? getters
        isCardDragging,
        cardModal,

        //? methods
        onClearCardModal,
        onCreateCard,
        onDeleteCard,
        onSetCardModal,
        onToggleCardDragging,
        onUpdateCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
