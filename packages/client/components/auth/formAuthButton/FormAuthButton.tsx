//* interface *//
interface Props {
  className?: string;
  isDisabled: boolean;
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: any;
}

export const FormAuthButton: React.FC<Props> = ({
  className,
  isDisabled,
  label,
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={() => {
        onClick ? onClick() : null;
      }}
      type={type}
      disabled={isDisabled}
      className={
        className
          ? className
          : "my-[10px] mx-0 h-[50px] cursor-pointer rounded-md  bg-emerald text-xl font-bold text-white outline-none transition-all duration-100  hover:bg-emerald/80 disabled:cursor-not-allowed disabled:text-white disabled:opacity-30 md:h-[60px]"
      }
    >
      {label}
    </button>
  );
};
