//* components *//
import { BoardCard, NewBoardCard } from "./";

//* hooks *//
import { useBoards } from "../../hooks";

export const YourBoards: React.FC = () => {
  const { boards } = useBoards();

  return (
    <section className="mt-4 w-full px-2">
      <h2 className="text-xl font-bold text-light">Tus tableros</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        <>
          {boards?.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
          <NewBoardCard />
        </>
      </ul>
    </section>
  );
};
