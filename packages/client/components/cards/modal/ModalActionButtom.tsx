import { IconType } from "react-icons/lib";

interface Props {
  action: any;
  text: string;
  icon?: IconType;
  variant?: "delete" | "success";
}

export const ModalActionButtom: React.FC<Props> = ({
  action,
  icon: Icon,
  text,
  variant,
}) => {
  if (variant === "success") {
    return (
      <button
        onClick={action}
        className="flex w-full items-center gap-2 rounded-md bg-green-700/90 p-2 text-sm hover:bg-green-800/90"
      >
        {Icon ? <Icon className="text-lg text-white" /> : null}
        <span className="text-white">{text}</span>
      </button>
    );
  }

  if (variant === "delete") {
    return (
      <button
        onClick={action}
        className="flex w-full items-center gap-2 rounded-md bg-red-700/90 p-2 text-sm hover:bg-red-800/90"
      >
        {Icon ? <Icon className="text-lg text-white" /> : null}
        <span className="text-white">{text}</span>
      </button>
    );
  }

  return (
    <button
      onClick={action}
      className="flex w-full items-center gap-2 rounded-md bg-gray-200 p-2 text-sm"
    >
      {Icon ? <Icon className="text-lg text-gray-700" /> : null}
      <span className="text-gray-700">{text}</span>
    </button>
  );
};
