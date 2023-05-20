import Link from "next/link";

//* icon *//
import { RiSearch2Line } from "react-icons/ri";

export const SearchInputMobile: React.FC = () => {
  return (
    <Link href="/search">
      <button className="ml-auto flex h-full items-center rounded-md px-2 hover:bg-light/50 sm:hidden">
        <RiSearch2Line className="text-xl text-white" />
      </button>
    </Link>
  );
};
