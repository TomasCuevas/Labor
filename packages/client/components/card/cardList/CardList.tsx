import { DragEvent } from "react";

//* components *//
import { NewCard, Card } from "@/components/card";

//* styles *//
import Styles from "./cardDragging.module.css";

//* store *//
import { useCardsStore } from "@/store";

//* interfaces *//
import { ICard, ICardStatus } from "@/interfaces";

interface Props {
  boardId: string;
  status: ICardStatus;
  title: string;
  cardsProp: ICard[];
}

export const CardList: React.FC<Props> = ({
  boardId,
  status,
  title,
  cardsProp,
}) => {
  const { isCardDragging, onToggleCardDragging, onUpdateCard } =
    useCardsStore();

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = async (event: DragEvent<HTMLElement>) => {
    const todoId = event.dataTransfer.getData("todoId");
    await onUpdateCard({ status }, todoId, boardId);

    onToggleCardDragging(false);
  };

  return (
    <section
      className={
        isCardDragging
          ? `${Styles.dragging} mx-2 mb-2 max-h-[calc(100%_-_8px)] w-[280px] min-w-[280px] overflow-y-auto`
          : "mx-2 mb-2 max-h-[calc(100%_-_8px)] w-[280px] min-w-[280px] overflow-y-auto"
      }
      onDrop={onDropEntry}
      onDragOver={allowDrop}
    >
      <div className="flex flex-col gap-1 rounded-md bg-[#ebecf0] p-2 backdrop-blur-xl">
        <div className="mb-1 flex w-full items-center">
          <h1 className="font-bold tracking-[1px] text-dark/60">{title}</h1>
        </div>
        <div className="flex flex-col gap-2">
          {cardsProp.length > 0 && (
            <div className="flex flex-col gap-[6px]">
              {cardsProp.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          )}
          <div>
            <NewCard boardId={boardId} status={status} />
          </div>
        </div>
      </div>
    </section>
  );
};
