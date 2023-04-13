import { DragEvent, useContext } from "react";

//* icons *//
import { RiAlignLeft } from "react-icons/ri";

//* data *//
import { labelColors } from "../../data";

//* context *//
import { CardContext } from "../../context";

//* interfaces *//
import { ICard } from "../../interfaces";

interface Props {
  card: ICard;
}

export const Card: React.FC<Props> = ({ card }) => {
  const { onToggleCardDragging, onSetCardModal } = useContext(CardContext);

  const onDragStart = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.setData("todoId", `${card.id}`);
    onToggleCardDragging(true);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={() => onSetCardModal(card)}
      className="flex cursor-pointer flex-col gap-[2px] rounded-md bg-gray-100 p-2 shadow-sm shadow-dark/50 hover:bg-gray-200"
    >
      {card.labels.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {card.labels.map((label: string) => (
            <span
              className="h-[9px] w-10 rounded-full"
              style={{ backgroundColor: labelColors[label] }}
              key={label}
            ></span>
          ))}
        </div>
      ) : null}
      <div>
        <span className="text-sm text-gray-600">{card.title}</span>
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
