import Link from "next/link";

//* icons *//
import { RiAppsFill, RiAddFill } from "react-icons/ri";
import { useContext } from "react";
import { HeaderContext } from "../../context";

export const Header: React.FC = () => {
  const { setCreatePop, setAccountPop, accountMenu, createMenu } =
    useContext(HeaderContext);

  return (
    <header className="fixed top-0 flex h-11 w-full items-center gap-3 bg-emerald px-2 py-1">
      <div
        className={`cursor flex h-full items-center rounded-md ${
          accountMenu ? "bg-light/50" : ""
        } hover:bg-light/50`}
      >
        <button className="h-full px-2" onClick={setAccountPop}>
          <RiAppsFill className="text-xl text-white" />
        </button>
      </div>
      <Link href="/">
        <div className="flex h-full cursor-pointer items-center gap-1 rounded-md px-2 hover:bg-light/50">
          <img src="/labor.svg" alt="Labor icon" className="w-6" />
          <span className="text-xl font-black text-white">Labor</span>
        </div>
      </Link>
      <div
        className={`ml-auto flex h-full items-center rounded-md ${
          createMenu ? "bg-light/50" : "bg-dark/50"
        } hover:bg-light/50`}
      >
        <button className="h-full px-2" onClick={setCreatePop}>
          <RiAddFill className="text-xl text-white" />
        </button>
      </div>
    </header>
  );
};
