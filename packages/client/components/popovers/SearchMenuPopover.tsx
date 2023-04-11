import { useContext } from "react";
import { useRouter } from "next/router";

//* icons *//
import { RiSearch2Line } from "react-icons/ri";

//* components *//
import { SearchBoard, SearchCard } from "../search";

//* context *//
import { HeaderContext } from "../../context";

//* store *//
import { useSearchStore } from "../../store";

export const SearchMenuPopover = () => {
  const { searchMenu, closeAllPops } = useContext(HeaderContext);
  const { boards, cards } = useSearchStore();

  const { push } = useRouter();

  if (searchMenu) {
    return (
      <div
        className="fixed top-0 left-0 z-10 hidden h-screen w-screen sm:block"
        onClick={closeAllPops}
      >
        <section className="absolute right-14 top-12 flex w-[464px] flex-col rounded-md bg-slate-800 shadow-xl shadow-slate-500/10">
          {cards!.length > 0 && (
            <div className="mt-1">
              <h3 className="ml-2 text-[17px] font-bold text-light">
                Tarjetas
              </h3>
              <div className="flex flex-col pt-1">
                {cards!.map((card) => (
                  <SearchCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          )}
          {boards!.length > 0 && (
            <div className="mt-1">
              <h3 className="ml-2 text-[17px] font-bold text-light">
                Tableros
              </h3>
              <div className="flex flex-col pt-1">
                {boards!.map((board) => (
                  <SearchBoard key={board.id} board={board} />
                ))}
              </div>
            </div>
          )}
          <hr />
          <div
            onClick={() => push("/search")}
            className="flex cursor-pointer gap-5 rounded-md p-3 duration-200 hover:bg-light/10"
          >
            <button>
              <RiSearch2Line className="text-xl text-white" />
            </button>
            <span className="text-white">Búsqueda avanzada</span>
          </div>
        </section>
      </div>
    );
  }

  return <></>;
};
