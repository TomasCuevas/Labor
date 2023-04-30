//* icons *//
import { RiMoreFill } from "react-icons/ri";

//* store *//
import { useBoardInterfaceStore } from "../../store";

//* interface *//
interface Props {
  boardName: string;
}

export const BoardHeader: React.FC<Props> = ({ boardName }) => {
  const { onToggleSidebar } = useBoardInterfaceStore();

  return (
    <div className="flex w-full items-center p-2">
      <div>
        <h1 className="text-xl font-bold text-white">{boardName}</h1>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => onToggleSidebar(true)}
          className="rounded-md bg-white/30 p-[6px] hover:bg-white/40"
        >
          <RiMoreFill className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};
