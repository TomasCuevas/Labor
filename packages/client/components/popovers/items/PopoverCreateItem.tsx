//* interface *//
interface Props {
  title: string;
  subtitle: string;
  onClick(props: any): void;
}

export const PopoverCreateItem: React.FC<Props> = ({
  onClick,
  subtitle,
  title,
}) => {
  return (
    <li className="flex px-2 hover:bg-light/20">
      <button onClick={onClick} className="flex w-full flex-col gap-1 py-[6px]">
        <div className="flex items-center gap-1">
          <img src="/labor.svg" alt="icon" className="w-6" />
          <span className="text-[15px] text-dark">{title}</span>
        </div>
        <p className="text-left text-xs">{subtitle}</p>
      </button>
    </li>
  );
};