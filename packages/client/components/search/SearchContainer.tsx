import { useEffect, useState } from "react";

//* icons *//
import { RiCloseFill } from "react-icons/ri";

//* components *//
import { SearchCard, SearchBoard } from "./";

//* hooks *//
import { useForm } from "../../hooks";

//* services *//
import { searchAll } from "../../services";

//* interfaces *//
import { ISearch } from "../../interfaces";

export const SearchContainer: React.FC = () => {
  const [searches, setSearches] = useState<ISearch>({ boards: [], cards: [] });
  const { search, reset, onInputChange } = useForm({
    search: "",
  });

  useEffect(() => {
    if (search.length === 0) {
      setSearches({ boards: [], cards: [] });
      return;
    }

    const timer = setTimeout(async () => {
      const result = await searchAll(search);
      if (!result.ok) return;
      setSearches({ boards: result.boards, cards: result.cards });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <section className="mx-auto mt-4 w-full max-w-[680px] px-4 sm:px-8 md:px-0">
      <h2 className="text-2xl font-black text-light">Buscar</h2>
      <div className="relative mt-4 flex items-center">
        <RiCloseFill
          className="absolute right-0 mr-2 text-2xl text-black/70"
          onClick={reset}
        />
        <input
          autoFocus
          autoComplete="off"
          className="w-full rounded-md border-none p-3 pr-8 text-sm outline-none"
          name="search"
          onChange={onInputChange}
          placeholder="Introduzca su palabra clave de búsqueda aquí"
          type="text"
          value={search}
        />
      </div>
      {searches.cards!.length > 0 && (
        <div className="mt-3">
          <h3 className="text-[17px] font-bold text-light">Tarjetas</h3>
          <div className="flex flex-col gap-1">
            {searches.cards!.map((card) => (
              <SearchCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}
      {searches.boards!.length > 0 && (
        <div className="mt-3">
          <h3 className="text-[17px] font-bold text-light">Tableros</h3>
          <div className="flex flex-col gap-1">
            {searches.boards!.map((board) => (
              <SearchBoard key={board.id} board={board} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
