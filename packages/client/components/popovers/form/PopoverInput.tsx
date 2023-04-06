//* interface *//
interface Props {
  focus?: boolean;
  inputName: string;
  inputValue: string;
  label: string;
  inputChange({ target }: any): void;
}

export const PopoverInput: React.FC<Props> = ({
  focus,
  inputName,
  inputValue,
  label,
  inputChange,
}) => {
  return (
    <div className="flex w-full flex-col">
      <label className="text-sm" htmlFor={inputName}>
        {label}
      </label>
      <input
        type="text"
        name={inputName}
        autoFocus={focus}
        value={inputValue}
        onChange={inputChange}
        className="rounded-md border-2 border-emerald px-2 outline-none focus:border-dark"
        autoComplete="off"
      />
    </div>
  );
};
