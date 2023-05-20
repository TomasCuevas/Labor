//* icon *//
import { RiAppsFill } from "react-icons/ri";

//* store *//
import { useHeaderStore } from "@/store";

export const AccountMenuButton: React.FC = () => {
  const { onChangeMenuOpen, menuOpen } = useHeaderStore();

  return (
    <div
      style={{
        backgroundColor: menuOpen === "account" ? "rgb(167 199 171 / 0.5)" : "",
      }}
      className="cursor flex h-full items-center rounded-md hover:bg-light/50"
    >
      <button
        className="h-full px-2"
        onClick={() => onChangeMenuOpen("account")}
      >
        <RiAppsFill className="text-xl text-white" />
      </button>
    </div>
  );
};
