import { useState, useEffect } from "react";

//* interface *//
interface Props {
  inputChange: any;
  inputName: string;
  inputType?: string;
  inputValue: string | number;
  label: string;
  max?: number;
}

export const FormAuthInput: React.FC<Props> = ({
  inputChange,
  inputName,
  inputType = "text",
  inputValue,
  label,
  max,
}) => {
  const [focus, setFocus] = useState(false);
  const inputFocus = () => setFocus(true);
  const inputBlur = () => {
    if (typeof inputValue === "string" && inputValue.length < 1) {
      setFocus(false);
    }
  };

  useEffect(() => {
    if (typeof inputValue === "string" && inputValue.length > 0) {
      setFocus(true);
    }
    if (typeof inputValue === "number" && inputValue) {
      setFocus(true);
    }
  }, [inputValue]);

  return (
    <div className="relative flex h-[60px] items-center rounded-md border border-emerald px-5">
      <label
        htmlFor={inputName}
        className={
          focus
            ? "absolute top-[5px] text-xs font-light text-light transition-all"
            : "absolute font-medium text-light transition-all"
        }
      >
        {label}
      </label>
      <input
        maxLength={max}
        onFocus={inputFocus}
        onBlur={inputBlur}
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="w-full border-none bg-[#0000] pt-[10px] text-lg font-medium text-white outline-none autofill:bg-[#0000]"
      />
    </div>
  );
};
