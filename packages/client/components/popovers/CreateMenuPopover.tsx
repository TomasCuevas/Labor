//* components *//
import { PopoverCreateItem, CreateBoard } from "@/components/popovers";

//* stores *//
import { useHeaderStore } from "@/store";

export const CreateMenuPopover: React.FC = () => {
  const {
    menuOpen,
    createMenuState,
    onChangeMenuOpen,
    onChangeCreateMenuState,
  } = useHeaderStore();

  if (menuOpen === "create") {
    return (
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen"
        onClick={() => onChangeMenuOpen("nothing")}
      >
        <section
          onClick={(event) => event.stopPropagation()}
          className="absolute right-2 top-12 flex w-[310px] max-w-[310px] flex-col rounded-md bg-slate-800/80 py-2 shadow-xl drop-shadow-md backdrop-blur-xl"
        >
          {createMenuState === "nothing" && (
            <ul>
              <PopoverCreateItem
                onClick={() => onChangeCreateMenuState("board")}
                subtitle="Un tablero es un conjunto de tarjetas ordenadas en listas. Utilícelo para gestionar proyectos, realizar un seguimiento de la información u organizar cualquier actividad."
                title="Crear tablero"
              />
            </ul>
          )}
          {createMenuState === "board" && <CreateBoard />}
        </section>
      </div>
    );
  }

  return <></>;
};
