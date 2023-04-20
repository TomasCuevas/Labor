import { useRouter } from "next/router";

//* components *//
import { PopoverItem } from "./";

//* store *//
import { useAuthStore, useHeaderStore } from "../../store";

export const AccountMenuPopover: React.FC = () => {
  const { user, setLogout } = useAuthStore();
  const { menuOpen, onChangeMenuOpen } = useHeaderStore();

  const router = useRouter();

  if (menuOpen === "account") {
    return (
      <div
        className="fixed top-0 left-0 z-10 h-screen w-screen"
        onClick={() => onChangeMenuOpen("nothing")}
      >
        <section className="absolute left-2 top-12 flex flex-col overflow-hidden rounded-md bg-slate-800/80 pt-5 shadow-xl drop-shadow-md backdrop-blur-xl">
          <h2 className="mb-2 px-4 text-xs font-bold text-emerald">CUENTA</h2>
          <div className="mb-4 flex gap-2 px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald">
              <span className="text-xl uppercase text-white">
                {user!.name.slice(0, 2)}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-white">{user!.name}</span>
              <span className="text-sm text-gray-400">{user!.email}</span>
            </div>
          </div>
          <hr className="mb-2" />
          <div>
            <ul className="flex flex-col">
              <PopoverItem
                onClick={() => router.push("/settings")}
                text="Ajustes"
              />
              <PopoverItem onClick={setLogout} text="Cerrar sesión" />
            </ul>
          </div>
        </section>
      </div>
    );
  }

  return <></>;
};
