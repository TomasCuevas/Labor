//* interface *//
interface Props {
  text: string;
  onClick(): any;
}

export const PopoverItem: React.FC<Props> = ({ text, onClick }) => {
  return (
    <li className="flex hover:bg-gray-200">
      <button
        onClick={onClick}
        className="flex w-full py-2 px-4 text-sm font-normal text-gray-900"
      >
        {text}
      </button>
    </li>
  );
};
