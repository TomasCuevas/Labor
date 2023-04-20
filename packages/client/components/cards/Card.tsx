import { DragEvent } from "react";

//* icons *//
import { RiAlignLeft } from "react-icons/ri";

//* data *//
import { labelColors } from "../../data";

//* store *//
import { useCardsStore } from "../../store";

//* interfaces *//
import { ICard } from "../../interfaces";

interface Props {
  card: ICard;
}

export const Card: React.FC<Props> = ({ card }) => {
  const { onToggleCardDragging, onToggleCardModal } = useCardsStore();

  const onDragStart = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.setData("todoId", `${card.id}`);
    onToggleCardDragging(true);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={() => onToggleCardModal(card)}
      className="group flex cursor-pointer flex-col gap-[2px] rounded-[4px] bg-gray-100 p-2 hover:bg-gray-200"
    >
      {card.labels.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {card.labels.map((label) => (
            <span
              className="h-[9px] w-10 rounded-full"
              style={{
                backgroundColor: labelColors[label as "orange"],
              }}
              key={label}
            ></span>
          ))}
        </div>
      ) : null}
      <div>
        <span className="text-sm text-gray-600 group-hover:text-gray-800">
          {card.title}
        </span>
      </div>
      {card.description && (
        <div>
          <span>
            <RiAlignLeft className="text-sm text-gray-600" />
          </span>
        </div>
      )}
    </div>
  );
};
