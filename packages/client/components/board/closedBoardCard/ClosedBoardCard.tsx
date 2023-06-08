import Link from "next/link";
import Swal from "sweetalert2";

//* icon *//
import { RiCloseFill } from "react-icons/ri";

//* store *//
import { useBoardInterfaceStore, useBoardsStore } from "@/store";

//* interface *//
import { IBoard } from "@/interfaces";

interface Props {
  closedBoard: IBoard;
}

export const ClosedBoardCard: React.FC<Props> = ({ closedBoard }) => {
  const { onUpdateBoard, onDeleteBoard } = useBoardsStore();
  const { onToggleClosedBoardsModal } = useBoardInterfaceStore();

  //! start open board
  const startOpenBoard = async () => {
    try {
      await onUpdateBoard(closedBoard.id, { status: "open" });
    } catch (error) {
      console.error(error);
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
        try {
          await onDeleteBoard(closedBoard.id);
        } catch (error) {}
      }
    });
  };

  return (
    <article className="flex items-center justify-between gap-1 border-b border-gray-300 py-1">
      <div className="flex min-w-[60%] items-center gap-4">
        <div className="w-6">
          <img
            src={`/board_background/${closedBoard.background}.svg`}
            alt="board background"
            className="min-w-6 h-6 w-6 rounded-md object-cover"
          />
        </div>
        <div className="w-[calc(100%_-_40px)]">
          <Link href={`/boards/${closedBoard.user.id}/${closedBoard.name}`}>
            <h3
              onClick={() => onToggleClosedBoardsModal(false)}
              className="cursor-pointer text-sm underline"
            >
              {closedBoard.name}
            </h3>
          </Link>
          <p className="text-xs">Espacio de trabajo de Evlun</p>
        </div>
      </div>
      <div className="[&>div>button]:item-center flex flex-wrap gap-1 [&>div>button>span]:text-sm [&>div>button>span]:font-light [&>div>button]:flex [&>div>button]:gap-1 [&>div>button]:rounded-md [&>div>button]:px-3 [&>div>button]:py-[5px] [&>div>button]:hover:shadow-inner [&>div]:ml-auto">
        <div>
          <button
            onClick={startDeleteBoard}
            className="bg-slate-300 text-dark hover:bg-slate-200"
          >
            <RiCloseFill className="text-xl" />
            <span>Eliminar</span>
          </button>
        </div>
        <div>
          <button
            onClick={startOpenBoard}
            className="bg-emerald/80 text-white hover:bg-emerald"
          >
            <span>Volver a abrir</span>
          </button>
        </div>
      </div>
    </article>
  );
};
