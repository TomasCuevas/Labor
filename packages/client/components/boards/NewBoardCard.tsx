//* icons *//
import { RiAddLine } from "react-icons/ri";

//* store *//
import { useHeaderStore } from "../../store";

export const NewBoardCard: React.FC = () => {
  const { onChangeMenuOpen, onChangeCreateMenuState } = useHeaderStore();

  return (
    <li className="h-20 w-full">
      <button
        onClick={() => {
          onChangeMenuOpen("create");
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
