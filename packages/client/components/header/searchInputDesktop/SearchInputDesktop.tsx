import { useRef, useEffect } from "react";
import { useFormik } from "formik";

//* icon *//
import { RiSearch2Line } from "react-icons/ri";

//* stores *//
import { useHeaderStore, useSearchStore } from "@/store";

export const SearchInputDesktop: React.FC = () => {
  const { onChangeMenuOpen } = useHeaderStore();
  const { clearData, onSearch } = useSearchStore();

  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: () => {},
  });

  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="ml-auto hidden h-full items-center rounded-md bg-light/50 sm:flex">
      <input
        type="text"
        className="w-0 border-b bg-[#0000] text-white outline-none transition-all duration-300 placeholder:text-sm placeholder:text-light/0 focus:mx-4 focus:w-[340px] focus:px-2 focus:pb-[2px] focus:placeholder:text-light md:focus:w-[380px]"
        placeholder="Buscar en Labor"
        onFocus={() => onChangeMenuOpen("search")}
        ref={inputRef}
        value={formik.values.search}
        onChange={formik.handleChange}
        name="search"
        autoComplete="off"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        className="h-full rounded-md px-4"
      >
        <RiSearch2Line className="text-xl text-white" />
      </button>
    </div>
  );
};
