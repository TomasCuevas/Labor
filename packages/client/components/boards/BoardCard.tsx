import Link from "next/link";

//* interfaces *//
import { IBoard } from "../../interfaces";

interface Props {
  board: IBoard;
}

export const BoardCard: React.FC<Props> = ({ board }) => {
  return (
    <li className="h-20 w-[calc(50%_-_8px)] sm:w-[calc(33%_-_8px)]">
      <Link href={`/boards/${board.user.id}/${board.name}`}>
        <button className="flex h-full w-full rounded-xl bg-emerald/20 px-4 py-2 hover:bg-emerald/70">
          <span className="font-bold text-white">{board.name}</span>
        </button>
      </Link>
    </li>
  );
};
