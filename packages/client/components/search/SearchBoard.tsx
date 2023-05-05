import Link from "next/link";

//* interfaces *//
import { IBoard } from "@/interfaces";

interface Props {
  board: IBoard;
}

export const SearchBoard: React.FC<Props> = ({ board }) => {
  return (
    <Link href={`/boards/${board.user.id}/${board.name}`}>
      <article className="flex cursor-pointer items-center gap-4 rounded-md p-2 duration-200 hover:bg-light/10">
        <div className="w-7">
          <img
            src={`/board_background/${board.background}.svg`}
            alt="icon"
            className="h-6 w-6 rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-sm font-semibold text-white">
              {board.name}
            </span>
          </div>
          <div className="flex gap-2 text-sm text-gray-300">
            <span>Espacio de trabajo de Labor</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
