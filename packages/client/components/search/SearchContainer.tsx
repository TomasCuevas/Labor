import { useEffect } from "react";

//* icons *//
import { RiCloseFill } from "react-icons/ri";

//* components *//
import { SearchCard, SearchBoard } from "./";

//* hooks *//
import { useForm } from "../../hooks";

//* store *//
import { useSearchStore } from "../../store";

export const SearchContainer: React.FC = () => {
  const { boards, cards } = useSearchStore();
  const { clearData, onSearch } = useSearchStore();

  const { search, reset, onInputChange } = useForm({
    search: "",
  });

  useEffect(() => {
    if (search.length < 1) {
      clearData();
      return;
    }

    const timer = setTimeout(async () => {
      onSearch(search);
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
      {cards!.length > 0 && (
        <div className="mt-3">
          <h3 className="text-[17px] font-bold text-light">Tarjetas</h3>
          <div className="flex flex-col pt-1">
            {cards!.map((card) => (
              <SearchCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}
      {boards!.length > 0 && (
        <div className="mt-3">
          <h3 className="text-[17px] font-bold text-light">Tableros</h3>
          <div className="flex flex-col pt-1">
            {boards!.map((board) => (
              <SearchBoard key={board.id} board={board} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
