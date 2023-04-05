interface Props {
  text: string;
  onClick(): any;
}

export const PopoverItem: React.FC<Props> = ({ text, onClick }) => {
  return (
    <li className="flex hover:bg-light/20">
      <button
        onClick={onClick}
        className="flex w-full py-[6px] px-4 text-sm font-normal"
      >
        {text}
      </button>
    </li>
  );
};
