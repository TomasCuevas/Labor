//* icons *//
import { RiCloseFill, RiArrowLeftSLine } from "react-icons/ri";

//* store *//
import { useBoardInterfaceStore } from "../../../store";

//* interface *//
import { IBoardSidebarSection } from "../../../interfaces";

interface Props {
  title: string;
  backAction?: IBoardSidebarSection;
}

export const BoardSidebarHeader: React.FC<Props> = ({ backAction, title }) => {
  const { onToggleSidebar, onSetSidebarSection } = useBoardInterfaceStore();

  return (
    <header className="flex w-full items-center border-b border-b-gray-500 py-3">
      {backAction ? (
        <button
          onClick={() => onSetSidebarSection(backAction)}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <RiArrowLeftSLine className="text-2xl text-gray-700" />
        </button>
      ) : null}
      <h3 className="ml-auto text-base font-semibold text-gray-700">{title}</h3>
      <button
        onClick={() => onToggleSidebar(false)}
        className="ml-auto rounded-full p-1 hover:bg-gray-100"
      >
        <RiCloseFill className="text-2xl text-gray-700" />
      </button>
    </header>
  );
};
