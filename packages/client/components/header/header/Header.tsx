import Link from "next/link";
import { useRouter } from "next/router";

//* components *//
import {
  AccountMenuButton,
  CreateMenuButton,
  SearchInputDesktop,
  SearchInputMobile,
} from "@/components/header";

export const Header: React.FC = () => {
  const { pathname } = useRouter();

  const Searcher = () => {
    if (pathname !== "/search") {
      return (
        <>
          <SearchInputMobile />
          <SearchInputDesktop />
        </>
      );
    }

    return <></>;
  };

  return (
    <header className="fixed top-0 z-10 flex h-11 w-full items-center gap-3 bg-black/30 px-2 py-1 backdrop-blur-3xl">
      <AccountMenuButton />
      <Link href="/">
        <div className="flex h-full cursor-pointer items-center gap-3 rounded-md px-2 shadow-inner hover:bg-light/50">
          <img src="/labor.svg" alt="Labor icon" className="h-6 w-6" />
          <span className="text-xl font-black text-white">Labor</span>
        </div>
      </Link>
      <Searcher />
      <CreateMenuButton />
    </header>
  );
};
