//* components *//
import { BoardCard, NewBoardCard } from "@/components/board";

//* hooks *//
import { useBoards } from "@/hooks";

export const YourBoards: React.FC = () => {
  const { boards } = useBoards();

  return (
    <section className="mx-auto max-h-[calc(100%_-_0px)] w-full max-w-[1200px] overflow-y-auto px-4 pt-11 sm:px-8">
      <h2 className=" pt-4 text-2xl font-black text-white">Tus tableros</h2>
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
