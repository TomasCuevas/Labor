import { Checkbox } from "@mui/material";
import { ChangeEvent } from "react";

//* interface *//
interface Props {
  color: string;
  name: string;
  value: boolean;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const LabelInput: React.FC<Props> = ({
  color,
  name,
  value,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 duration-200 hover:opacity-50">
      <Checkbox name={name} checked={value} onChange={onChange} />
      <div
        className="flex h-8 w-full items-center rounded-sm"
        style={{ backgroundColor: `${color}55` }}
      >
        <span
          className="ml-3 h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
      </div>
    </label>
  );
};
