//* interface *//
interface Props {
  title: string;
  subtitle: string;
  onClick(props: any): void;
}

export const PopoverCreate: React.FC<Props> = ({
  onClick,
  subtitle,
  title,
}) => {
  return (
    <li className="group flex p-2 hover:bg-gray-200">
      <button onClick={onClick} className="flex w-full flex-col gap-1 py-[6px]">
        <div className="flex items-center gap-1">
          <img src="/labor.svg" alt="icon" className="w-6" />
          <span className="text-[15px] text-emerald">{title}</span>
        </div>
        <p className="text-left text-xs text-gray-900">{subtitle}</p>
      </button>
    </li>
  );
};
