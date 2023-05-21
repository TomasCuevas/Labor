//* interface *//
interface Props {
  isDisabled: boolean;
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: any;
}

export const PopoverButton: React.FC<Props> = ({
  isDisabled,
  label,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={() => {
        onClick ? onClick() : null;
      }}
      className="cursor-pointer rounded-md bg-emerald py-1 text-sm text-white hover:bg-emerald/80 disabled:cursor-not-allowed disabled:bg-dark/20"
    >
      {label}
    </button>
  );
};
