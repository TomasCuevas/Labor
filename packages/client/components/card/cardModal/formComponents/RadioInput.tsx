import { ChangeEvent } from "react";

//* interface *//
interface Props {
  value: string;
  checked: boolean;
  inputName: string;
  label: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioInput: React.FC<Props> = ({
  checked,
  inputName,
  label,
  value,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-1">
      <input
        value={value}
        type="radio"
        name={inputName}
        checked={checked}
        onChange={onChange}
        className="cursor-pointer"
      />
      <span className="mt-[1px] text-sm text-gray-600">{label}</span>
    </label>
  );
};
