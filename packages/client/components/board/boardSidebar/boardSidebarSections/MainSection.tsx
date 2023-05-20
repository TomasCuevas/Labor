import { useRouter } from "next/router";
import Swal from "sweetalert2";

//* comppnents *//
import { BoardSidebarHeader, BoardSidebarItem } from "@/components/board";

//* store *//
import { useBoardInterfaceStore, useBoardsStore } from "@/store";

export const MainSection: React.FC = () => {
  const { onUpdateBoard } = useBoardsStore();
  const { board, onToggleSidebar } = useBoardInterfaceStore();
  const { replace } = useRouter();

  //! start close board
  const startCloseBoard = async () => {
    Swal.fire({
      title: "¿Desea cerrar el tablero?",
      text: "Puede buscar y volver a abrir los tableros cerrados en la parte inferior de su página de tableros.",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#0d132c",
      confirmButtonText: "Cerrar tablero",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onUpdateBoard(board!.id, { status: "closed" });
          replace(`/boards/${board?.user.id}/${board?.name}`);
        } catch (error) {
          console.error(error);
        }

        onToggleSidebar(false);
      }
    });
  };

  return (
    <>
      <BoardSidebarHeader title="Menú" />
      <ul className="flex w-full flex-col">
        <BoardSidebarItem
          description="Añada una descripción a su tablero"
          title="Acerca de este tablero"
          navigate="about"
          icon={
            <span>
              <img src="/labor.svg" alt="Labor icon" />
            </span>
          }
        />
        <BoardSidebarItem
          title="Cambiar fondo"
          navigate="background"
          icon={
            <img
              src={`/board_background/${board?.background}.svg`}
              alt="board background"
              className="h-6 w-6 rounded-md object-cover"
            />
          }
        />
        <hr className="mt-4 mb-2 border-gray-500"></hr>
        <div onClick={startCloseBoard}>
          <BoardSidebarItem title="Cerrar tablero..." />
        </div>
      </ul>
    </>
  );
};
