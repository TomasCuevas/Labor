import { ChangeEvent } from "react";
import { Checkbox } from "@mui/material";

//* interface *//
interface Props {
  color: string;
  name: string;
  value: string;
  checked: boolean;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const CheckboxInput: React.FC<Props> = ({
  checked,
  color,
  name,
  value,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 hover:opacity-50">
      <Checkbox
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div
        className="flex h-8 w-full items-center rounded-sm"
        style={{ backgroundColor: `${color}55` }}
      >
        <span
          className="ml-3 h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </label>
  );
};
