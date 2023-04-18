//* components *//
import { CardList } from "../cards";

//* hooks *//
import { useCards } from "../../hooks";

//* inteface *//
interface Props {
  boardId: string;
}

export const Board: React.FC<Props> = ({ boardId }) => {
  const { cards } = useCards(boardId);

  return (
    <div className="flex h-full w-full flex-nowrap overflow-y-hidden overflow-x-scroll">
      <CardList
        boardId={boardId}
        status="pending"
        title="Pendientes"
        cardsProp={cards?.filter((card) => card.status === "pending")}
      />
      <CardList
        boardId={boardId}
        status="in-progress"
        title="En progreso"
        cardsProp={cards?.filter((card) => card.status === "in-progress")}
      />
      <CardList
        boardId={boardId}
        status="completed"
        title="Completadas"
        cardsProp={cards?.filter((card) => card.status === "completed")}
      />
    </div>
  );
};
