import { useContext, useState } from "react";

//* components *//
import { PopoverCreateItem, CreateBoard } from "./";

//* context *//
import { HeaderContext } from "../../context";

export const CreateMenuPopover: React.FC = () => {
  const { createMenu, closeAllPops, createMenuState, onChangeCreateMenuState } =
    useContext(HeaderContext);

  if (createMenu) {
    return (
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen"
        onClick={closeAllPops}
      >
        <section
          onClick={(event) => event.stopPropagation()}
          className="absolute right-2 top-12 flex w-[310px] max-w-[310px] flex-col rounded-md bg-white py-2 drop-shadow-md"
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
