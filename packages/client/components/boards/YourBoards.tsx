//* components *//
import { BoardCard, NewBoardCard } from "./";

//* hooks *//
import { useBoards } from "../../hooks";

export const YourBoards: React.FC = () => {
  const { boards } = useBoards();

  return (
    <section className="mx-auto mt-4 w-full max-w-[1200px] px-4 sm:px-8">
      <h2 className="text-xl font-bold text-light">Tus tableros</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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
