//* icons *//
import { RiAddLine } from "react-icons/ri";

//* store *//
import { useHeaderStore } from "@/store";

export const NewBoardCard: React.FC = () => {
  const { onChangeMenuOpen, onChangeCreateMenuState } = useHeaderStore();

  return (
    <li className="h-20 w-full">
      <button
        onClick={() => {
          onChangeMenuOpen("create");
          onChangeCreateMenuState("board");
        }}
        className="relative flex h-full w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-dark p-4 lg:justify-start lg:px-8"
      >
        <span className="absolute top-0 left-0 h-full w-full bg-gray-700/30 hover:bg-black/0"></span>
        <RiAddLine className="text-4xl text-white lg:text-3xl" />
        <span className="hidden text-center text-white lg:block">
          Crear tablero
        </span>
      </button>
    </li>
  );
};
