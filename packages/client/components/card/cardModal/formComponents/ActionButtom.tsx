import { IconType } from "react-icons/lib";

//* interface *//
interface Props {
  onSubmit?: any;
  disabled?: boolean;
  icon?: IconType;
  text: string;
  type: "button" | "submit" | "reset";
  variant?: "delete" | "success";
}

export const ActionButtom: React.FC<Props> = ({
  onSubmit,
  disabled,
  icon: Icon,
  text,
  type,
  variant,
}) => {
  if (variant === "success") {
    return (
      <button
        type={type}
        onClick={onSubmit}
        className="flex w-full items-center gap-2 rounded-md bg-green-700/90 p-2 text-sm hover:bg-green-800/90 disabled:cursor-not-allowed disabled:bg-green-900/50"
        disabled={disabled}
      >
        {Icon ? <Icon className="text-lg text-white" /> : null}
        <span className="text-white">{text}</span>
      </button>
    );
  }

  if (variant === "delete") {
    return (
      <button
        type={type}
        onClick={onSubmit}
        className="flex w-full items-center gap-2 rounded-md bg-red-700/90 p-2 text-sm hover:bg-red-800/90"
        disabled={disabled}
      >
        {Icon ? <Icon className="text-lg text-white" /> : null}
        <span className="text-white">{text}</span>
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onSubmit}
      className="flex w-full items-center gap-2 rounded-md bg-gray-200 p-2 text-sm"
      disabled={disabled}
    >
      {Icon ? <Icon className="text-lg text-gray-700" /> : null}
      <span className="text-gray-700">{text}</span>
    </button>
  );
};
