import { Checkbox } from "@mui/material";

interface Props {
  name: string;
  value: boolean;
  onChange: any;
  label: string;
}

export const FormAuthCheckbox: React.FC<Props> = ({
  label,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="flex">
      <label className="flex cursor-pointer items-center">
        <Checkbox
          value={value}
          onChange={onChange}
          name={name}
          checked={value}
          sx={{
            color: "#1f8675",
            "&.Mui-checked": {
              color: "#1f8675",
            },
          }}
        />
        <span className="font-light text-white/80">{label}</span>
      </label>
    </div>
  );
};
