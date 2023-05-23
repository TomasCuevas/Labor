//* icons *//
import { RiCloseFill } from "react-icons/ri";
import { ClosedBoard } from "@/components/icons";

//* component *//
import { ClosedBoardCard } from "@/components/board";

//* hooks *//
import { useBoards } from "@/hooks";

//* store *//
import { useBoardInterfaceStore } from "@/store";

export const ClosedBoardsModal: React.FC = () => {
  const { closedBoards } = useBoards();
  const { onToggleClosedBoardsModal } = useBoardInterfaceStore();

  return (
    <div
      className="absolute top-0 left-0 z-20 flex h-screen w-screen items-start justify-center bg-dark/90 py-10"
      onClick={() => onToggleClosedBoardsModal(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[100%] w-[95%] max-w-[768px] flex-col gap-4 overflow-y-auto rounded-md bg-white p-2"
      >
        <header className="flex items-center gap-3">
          <ClosedBoard className="w-6" />
          <h2 className="text-lg font-medium">Tableros cerrados</h2>
          <button className="group ml-auto rounded-full shadow-md hover:shadow-black/30">
            <RiCloseFill
              onClick={() => onToggleClosedBoardsModal(false)}
              className="h-6 w-6 text-dark"
            />
          </button>
        </header>
        <section className="flex flex-col gap-2">
          {closedBoards.length > 0 ? (
            closedBoards.map((closedBoard) => (
              <ClosedBoardCard key={closedBoard.id} closedBoard={closedBoard} />
            ))
          ) : (
            <div className="bg-gray-200/60 py-6 px-4 text-center text-[13px] text-gray-500">
              <p>No se ha cerrado ningún tablero.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
