import Link from "next/link";

//* interfaces *//
import { IBoard } from "../../interfaces";

interface Props {
  board: IBoard;
}

export const BoardCard: React.FC<Props> = ({ board }) => {
  return (
    <li className="h-20 w-full overflow-hidden rounded-md">
      <Link href={`/boards/${board.user.id}/${board.name}`}>
        <button
          className="relative flex h-full w-full overflow-hidden rounded-md bg-cover bg-center bg-no-repeat px-4 py-2 sm:px-6"
          style={{
            backgroundImage: `url(/board_background/${board.background}.svg)`,
          }}
        >
          <span className="absolute top-0 left-0 h-full w-full bg-black/5 hover:bg-black/0"></span>
          <span className="text-lg font-bold text-white">{board.name}</span>
        </button>
      </Link>
    </li>
  );
};
