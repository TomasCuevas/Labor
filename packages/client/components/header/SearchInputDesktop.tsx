import { useContext, useRef, useEffect } from "react";
import { useRouter } from "next/router";

//* icons *//
import { RiSearch2Line } from "react-icons/ri";

//* hooks *//
import { useForm } from "../../hooks";

//* context *//
import { HeaderContext } from "../../context";

//* store *//
import { useSearchStore } from "../../store";

export const SearchInputDesktop = () => {
  const { setSearchPop } = useContext(HeaderContext);
  const { clearData, onSearch } = useSearchStore();

  const { search, onInputChange } = useForm({ search: "" });

  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useRouter();

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
    <div
      className={`ml-auto h-full items-center rounded-md bg-light/50 ${
        pathname === "/search" ? "hidden" : "hidden sm:flex"
      }`}
    >
      <input
        type="text"
        className="w-0 border-b bg-[#0000] text-white outline-none transition-all duration-300 placeholder:text-sm placeholder:text-light/0 focus:mx-4 focus:w-[340px] focus:px-2 focus:pb-[2px] focus:placeholder:text-light md:focus:w-[380px]"
        placeholder="Buscar en Labor"
        onFocus={() => setSearchPop()}
        ref={inputRef}
        value={search}
        onChange={onInputChange}
        name="search"
      />
      <button
        onClick={() => inputRef.current?.focus()}
        className="h-full rounded-md px-4"
      >
        <RiSearch2Line className="text-xl text-white" />
      </button>
    </div>
  );
};
