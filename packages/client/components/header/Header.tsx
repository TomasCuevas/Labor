import Link from "next/link";

//* components *//
import {
  AccountMenuButton,
  CreateMenuButton,
  SearchInputDesktop,
  SearchInputMobile,
} from "./";

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-10 flex h-11 w-full items-center gap-3 bg-black/30 px-2 py-1 backdrop-blur-3xl">
      <AccountMenuButton />
      <Link href="/">
        <div className="flex h-full cursor-pointer items-center gap-1 rounded-md px-2 hover:bg-light/50">
          <img src="/labor.svg" alt="Labor icon" className="w-6" />
          <span className="text-xl font-black text-white">Labor</span>
        </div>
      </Link>
      <SearchInputMobile />
      <SearchInputDesktop />
      <CreateMenuButton />
    </header>
  );
};
