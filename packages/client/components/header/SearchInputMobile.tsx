import { useRouter } from "next/router";
import Link from "next/link";

//* icon *//
import { RiSearch2Line } from "react-icons/ri";

export const SearchInputMobile: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <Link href="/search">
      <button
        className={`ml-auto h-full items-center rounded-md px-2 hover:bg-light/50 sm:hidden ${
          pathname === "/search" ? "hidden" : "flex"
        }`}
      >
        <RiSearch2Line className="text-xl text-white" />
      </button>
    </Link>
  );
};
