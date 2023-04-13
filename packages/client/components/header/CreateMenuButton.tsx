import { useContext } from "react";
import { useRouter } from "next/router";

//* icons *//
import { RiAddFill } from "react-icons/ri";

//* context *//
import { HeaderContext } from "../../context";

export const CreateMenuButton: React.FC = () => {
  const { setCreatePop, createMenu } = useContext(HeaderContext);
  const { pathname } = useRouter();

  return (
    <div
      style={{
        backgroundColor: createMenu
          ? "rgb(167 199 171 / 0.5)"
          : "rgb(13 19 44 / 0.5)",
        marginLeft: pathname === "/search" ? "auto" : "",
      }}
      className="flex h-full items-center rounded-md hover:bg-light/50"
    >
      <button className="h-full px-2" onClick={setCreatePop}>
        <RiAddFill className="text-xl text-white" />
      </button>
    </div>
  );
};
