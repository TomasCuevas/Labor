import { useContext } from "react";
import { useRouter } from "next/router";

//* components *//
import { PopoverItem } from "./";

//* context *//
import { AuthContext, HeaderContext } from "../../context";

export const AccountMenuPopover: React.FC = () => {
  const { user, onLogout } = useContext(AuthContext);
  const { accountMenu, closeAllPops } = useContext(HeaderContext);
  const router = useRouter();

  if (accountMenu) {
    return (
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen"
        onClick={closeAllPops}
      >
        <section className="absolute left-2 top-12 flex flex-col rounded-md border border-dark/10 bg-white pt-5 drop-shadow-md">
          <h2 className="mb-2 px-4 text-xs font-bold text-emerald">CUENTA</h2>
          <div className="mb-4 flex gap-2 px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald">
              <span className="text-xl uppercase text-white">
                {user!.name.slice(0, 2)}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-dark">{user!.name}</span>
              <span className="text-sm text-light">{user!.email}</span>
            </div>
          </div>
          <hr className="mb-2" />
          <div>
            <ul className="flex flex-col">
              <PopoverItem
                onClick={() => router.push("/settings")}
                text="Ajustes"
              />
              <PopoverItem onClick={onLogout} text="Cerrar sesión" />
            </ul>
          </div>
        </section>
      </div>
    );
  }

  return <></>;
};
