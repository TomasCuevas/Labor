import { MouseEvent, useState } from "react";

//* icons *//
import { RiAlignLeft, RiUserLine } from "react-icons/ri";

//* components *//
import { BoardSidebarHeader } from "@/components/boards";

//* hook *//
import { useForm } from "@/hooks";

//* store *//
import { useAuthStore, useBoardInterfaceStore, useBoardsStore } from "@/store";

export const AboutSection = () => {
  const { user } = useAuthStore();
  const { board, onSetBoard } = useBoardInterfaceStore();
  const { onUpdateBoard } = useBoardsStore();
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  const { description, onInputChange } = useForm({
    description: board!.description,
  });

  //! start update description
  const startUpdateDescription = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const result = await onUpdateBoard(board!.id, {
      description: description || " ",
    });
    if (result) onSetBoard(result.board!);
    setIsInputOpen(false);
  };

  return (
    <>
      <BoardSidebarHeader title="Acerca de este tablero" backAction="main" />
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-3 text-gray-700">
          <RiUserLine className="text-xl" />
          <span>Administradores del tablero</span>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald">
            <span className="text-xl uppercase text-white">
              {user!.name.slice(0, 2)}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-900">{user!.name}</span>
            <span className="text-sm text-gray-700">{user!.email}</span>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-3 text-gray-700">
          <RiAlignLeft className="text-xl" />
          <span>Descripción</span>
        </div>
        <div className="mt-4">
          {isInputOpen ? (
            <>
              <div>
                <textarea
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  className="h-32 w-full resize-none rounded-md bg-gray-200 p-2 text-dark outline-none placeholder:text-dark/70"
                  maxLength={300}
                  placeholder="Introduzca una descripción..."
                  autoFocus
                >
                  {description}
                </textarea>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <button
                  type="submit"
                  onClick={startUpdateDescription}
                  className="cursor-pointer rounded-md bg-emerald p-2 px-4 text-sm text-white hover:bg-emerald/80"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setIsInputOpen(false)}
                  className="cursor-pointer rounded-md bg-gray-500 p-2 px-4 text-sm text-white hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsInputOpen(true)}
              className={`flex h-32 w-full rounded-md p-2 ${
                board!.description.trim().length > 0
                  ? "bg-gray-300/80"
                  : "bg-gray-300/40"
              }`}
            >
              <div className="flex w-full">
                <span className="text-left text-[15px] text-gray-700">
                  {board!.description.trim().length > 0
                    ? board!.description
                    : "Añada una descripción para que sus compañeros de equipo conozcan la finalidad del tablero."}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
