import { useContext } from "react";

//* contexts *//
import { HeaderContext } from "../../context";

export const NewBoardCard: React.FC = () => {
  const { setCreatePop, onChangeCreateMenuState } = useContext(HeaderContext);

  return (
    <li className="h-20 w-[calc(50%_-_8px)] sm:w-[calc(33%_-_8px)]">
      <button
        onClick={() => {
          setCreatePop();
          onChangeCreateMenuState("board");
        }}
        className="flex h-full w-full items-center justify-center rounded-xl bg-emerald/20 p-4 hover:bg-emerald/70"
      >
        <span className="font-light text-white">Crear un nuevo tablero</span>
      </button>
    </li>
  );
};
