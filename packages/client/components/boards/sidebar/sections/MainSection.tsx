//* comppnents *//
import { BoardSidebarHeader, BoardSidebarItem } from "../../";

//* store *//
import { useBoardInterfaceStore } from "../../../../store";

export const MainSection: React.FC = () => {
  const { board } = useBoardInterfaceStore();

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
              className="object-fill"
            />
          }
        />
        <span className="mt-4"></span>
        <BoardSidebarItem title="Cerrar tablero" />
      </ul>
    </>
  );
};
