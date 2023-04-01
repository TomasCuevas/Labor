//* components *//
import { TodoList } from "../todos";

//* hooks *//
import { useTodos } from "../../hooks";

//* inteface *//
interface Props {
  boardId: string;
}

export const Board: React.FC<Props> = ({ boardId }) => {
  const { todos } = useTodos(boardId);

  return (
    <div className="mt-4 flex max-h-[calc(100vh_-_64px)] w-full flex-nowrap overflow-y-hidden overflow-x-scroll">
      <TodoList
        boardId={boardId}
        status="pending"
        title="Pendientes"
        todosProp={todos?.filter((todo) => todo.status === "pending")}
      />
      <TodoList
        boardId={boardId}
        status="in-progress"
        title="En progreso"
        todosProp={todos?.filter((todo) => todo.status === "in-progress")}
      />
      <TodoList
        boardId={boardId}
        status="completed"
        title="Completadas"
        todosProp={todos?.filter((todo) => todo.status === "completed")}
      />
    </div>
  );
};
