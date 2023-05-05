//* icons *//
import { RiCheckFill } from "react-icons/ri";

//* store *//
import { useBoardInterfaceStore, useBoardsStore } from "@/store";

//* interface *//
interface Props {
  background: string;
  isSelected: boolean;
}

export const BackgroundCard: React.FC<Props> = ({ background, isSelected }) => {
  const { onUpdateBoard } = useBoardsStore();
  const { board, onSetBoard } = useBoardInterfaceStore();

  //! start update background
  const startUpdateBackground = async () => {
    const result = await onUpdateBoard(board!.id, { background });
    if (result) onSetBoard(result.board!);
  };

  return (
    <div
      onClick={() => startUpdateBackground()}
      className="relative flex h-24 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-cover bg-center"
      style={{ backgroundImage: `url(/board_background/${background}.svg)` }}
    >
      <div className="absolute left-0 top-0 h-full w-full hover:bg-white/40"></div>
      {isSelected ? <RiCheckFill className="text-2xl text-white" /> : null}
    </div>
  );
};
