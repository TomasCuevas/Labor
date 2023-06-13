import { useState, useEffect } from "react";

//* icons *//
import { BsEye, BsEyeSlash } from "react-icons/bs";

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
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

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
    <label className="relative flex h-[60px] items-center rounded-md border border-emerald px-5">
      <span
        className={
          focus
            ? "absolute top-[5px] text-xs font-light text-light transition-all"
            : "absolute font-medium text-light transition-all"
        }
      >
        {label}
      </span>
      <input
        maxLength={max}
        onFocus={() => setFocus(true)}
        onBlur={inputBlur}
        type={viewPassword ? "text" : inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="w-full border-none bg-[#0000] pt-[10px] text-lg font-medium text-white outline-none autofill:bg-[#0000]"
      />
      {inputType === "password" ? (
        viewPassword ? (
          <BsEye
            onClick={() => setViewPassword(false)}
            className="mt-1 cursor-pointer text-2xl text-white"
          />
        ) : (
          <BsEyeSlash
            onClick={() => setViewPassword(true)}
            className="mt-1 cursor-pointer text-2xl text-white"
          />
        )
      ) : null}
    </label>
  );
};
