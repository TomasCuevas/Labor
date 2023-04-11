import Link from "next/link";

//* icons *//
import { FaPager } from "react-icons/fa";

//* interfaces *//
import { ICard } from "../../interfaces";

interface Props {
  card: ICard;
}

export const SearchCard: React.FC<Props> = ({ card }) => {
  return (
    <Link href={`/boards/${card.user!.id}/${card.board.name}?modal=${card.id}`}>
      <article className="flex cursor-pointer gap-4 rounded-md p-2 duration-200 hover:bg-light/10">
        <div>
          <FaPager className="mt-1 text-2xl text-emerald" />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-sm font-semibold text-white">
              {card.title}
            </span>
          </div>
          <div className="flex gap-2 text-[13px] text-gray-300">
            <span>{card.board.name}:</span>
            <span>
              {(card.status === "pending" && "Pendientes") ||
                (card.status === "in-progress" && "En progreso") ||
                (card.status === "completed" && "Completadas")}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
