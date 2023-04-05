import { useContext } from "react";

//* icons *//
import { RiAddLine } from "react-icons/ri";

//* contexts *//
import { HeaderContext } from "../../context";

export const NewBoardCard: React.FC = () => {
  const { setCreatePop, onChangeCreateMenuState } = useContext(HeaderContext);

  return (
    <li className="h-20 w-full">
      <button
        onClick={() => {
          setCreatePop();
          onChangeCreateMenuState("board");
        }}
        className="flex h-full w-full items-center justify-center gap-2 rounded-md bg-emerald/20 p-4 hover:bg-emerald/70"
      >
        <RiAddLine className="text-4xl text-white lg:text-3xl" />
        <span className="hidden text-center text-white lg:block">
          Crear tablero
        </span>
      </button>
    </li>
  );
};
