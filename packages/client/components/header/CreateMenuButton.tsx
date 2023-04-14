import { useRouter } from "next/router";

//* icons *//
import { RiAddFill } from "react-icons/ri";

//* store *//
import { useHeaderStore } from "../../store";

export const CreateMenuButton: React.FC = () => {
  const { menuOpen, onChangeMenuOpen } = useHeaderStore();
  const { pathname } = useRouter();

  return (
    <div
      style={{
        backgroundColor:
          menuOpen === "create"
            ? "rgb(167 199 171 / 0.5)"
            : "rgb(13 19 44 / 0.5)",
        marginLeft: pathname === "/search" ? "auto" : "",
      }}
      className="flex h-full items-center rounded-md hover:bg-light/50"
    >
      <button
        className="h-full px-2"
        onClick={() => onChangeMenuOpen("create")}
      >
        <RiAddFill className="text-xl text-white" />
      </button>
    </div>
  );
};
