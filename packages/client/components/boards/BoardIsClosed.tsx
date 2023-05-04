import { useRouter } from "next/router";
import Swal from "sweetalert2";

//* store *//
import { useBoardsStore } from "@/store";

//* interface *//
import { IBoard } from "@/interfaces";

interface Props {
  board: IBoard;
}

export const BoardIsClosed: React.FC<Props> = ({ board }) => {
  const { onDeleteBoard, onUpdateBoard } = useBoardsStore();
  const { replace } = useRouter();

  //! start open board
  const startOpenBoard = async () => {
    const result = await onUpdateBoard(board.id, { status: "open" });
    if (result.ok) {
      replace(`/boards/${board.user.id}/${board.name}`);
    }
  };

  //! start delete board
  const startDeleteBoard = async () => {
    Swal.fire({
      title: "¿Eliminar tablero?",
      text: "Se quitarán todas las tarjetas y acciones y no podrá volver a abrir el tablero. No es posible deshacer la operación.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#0d132c",
      confirmButtonText: "Eliminar tablero",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onDeleteBoard(board.id);
        replace("/");
      }
    });
  };

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-y-5 rounded-sm bg-white py-12 shadow-lg shadow-black/10 sm:w-[600px]">
        <h2 className="text-center text-[22px] font-semibold text-gray-800">
          {`"${board.name}"`} está cerrado
        </h2>
        <button
          type="button"
          onClick={startOpenBoard}
          className="rounded-sm bg-emerald px-4 py-2 text-sm text-white hover:bg-emerald/90"
        >
          Volver a abrir el tablero
        </button>
        <span
          onClick={startDeleteBoard}
          className="mt-2 cursor-pointer text-sm text-gray-600 underline hover:text-black"
        >
          <p>Eliminar el tablero de forma permanente</p>
        </span>
      </div>
    </div>
  );
};
