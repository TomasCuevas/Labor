//* store *//
import { useBoardInterfaceStore } from "@/store";

//* interfaces *//
import { IBoardSidebarSection } from "@/interfaces";

interface Props {
  description?: string;
  icon?: React.ReactNode;
  navigate?: IBoardSidebarSection;
  title: string;
}

export const BoardSidebarItem: React.FC<Props> = ({
  description,
  icon,
  navigate,
  title,
}) => {
  const { onSetSidebarSection } = useBoardInterfaceStore();

  return (
    <li
      onClick={navigate ? () => onSetSidebarSection(navigate) : () => {}}
      className="flex w-full cursor-pointer items-center gap-4 rounded-md px-3 py-2 hover:bg-gray-200"
    >
      {icon ? <div className="w-6">{icon}</div> : null}
      <div className="flex flex-col">
        <span className="text-[13px] font-medium">{title}</span>
        {description ? (
          <span className="text-[13px] font-light">{description}</span>
        ) : null}
      </div>
    </li>
  );
};
