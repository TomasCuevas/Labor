import Link from "next/link";

//* interfaces *//
import { IBoard } from "../../interfaces";

interface Props {
  board: IBoard;
}

export const SearchBoard: React.FC<Props> = ({ board }) => {
  return (
    <Link href={`/boards/${board.user.id}/${board.name}`}>
      <article className="flex cursor-pointer gap-4 rounded-md p-2 duration-200 hover:bg-light/10">
        <div>
          <img src="/labor.svg" alt="icon" className="w-7" />
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
