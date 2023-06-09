import { useEffect } from "react";
import { useFormik } from "formik";

//* icon *//
import { RiCloseFill } from "react-icons/ri";

//* components *//
import { SearchCard, SearchBoard } from "@/components/search";

//* store *//
import { useSearchStore } from "@/store";

export const SearchContainer: React.FC = () => {
  const { boards, cards } = useSearchStore();
  const { clearData, onSearch } = useSearchStore();

  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: () => {},
  });

  useEffect(() => {
    const search = formik.values.search;

    if (search.length < 1) {
      clearData();
      return;
    }

    const timer = setTimeout(async () => {
      onSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [formik.values.search]);

  return (
    <div className="mx-4 mt-4 flex w-full items-start pt-11">
      <section className="mx-auto flex max-h-[calc(100vh_-_64px)] w-full max-w-[750px] flex-col overflow-y-auto rounded-2xl bg-dark/20 px-4 py-4 backdrop-blur-2xl sm:px-8">
        <h2 className="text-2xl font-black text-white">Buscar</h2>
        <div className="relative mt-4 flex items-center">
          <button className="absolute right-0 mr-2">
            <RiCloseFill
              className="text-2xl text-black/70"
              onClick={() => formik.resetForm()}
            />
          </button>
          <input
            autoFocus
            autoComplete="off"
            className="w-full rounded-md border-none p-3 pr-8 text-sm outline-none"
            name="search"
            onChange={formik.handleChange}
            placeholder="Introduzca su palabra clave de búsqueda aquí"
            type="text"
            value={formik.values.search}
          />
        </div>
        {cards!.length > 0 && (
          <div className="mt-3">
            <h3 className="text-[17px] font-bold text-white">Tarjetas</h3>
            <div className="flex flex-col pt-1">
              {cards!.map((card) => (
                <SearchCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}
        {boards!.length > 0 && (
          <div className="mt-3">
            <h3 className="text-[17px] font-bold text-white">Tableros</h3>
            <div className="flex flex-col pt-1">
              {boards!.map((board) => (
                <SearchBoard key={board.id} board={board} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
