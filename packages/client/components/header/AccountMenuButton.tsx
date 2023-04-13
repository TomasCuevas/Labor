import { useContext } from "react";

//* icons *//
import { RiAppsFill } from "react-icons/ri";

//* context *//
import { HeaderContext } from "../../context";

export const AccountMenuButton: React.FC = () => {
  const { setAccountPop, accountMenu } = useContext(HeaderContext);

  return (
    <div
      style={{ backgroundColor: accountMenu ? "rgb(167 199 171 / 0.5)" : "" }}
      className="cursor flex h-full items-center rounded-md hover:bg-light/50"
    >
      <button className="h-full px-2" onClick={setAccountPop}>
        <RiAppsFill className="text-xl text-white" />
      </button>
    </div>
  );
};
