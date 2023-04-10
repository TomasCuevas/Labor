import { useState } from "react";

//* interfaces *//
interface Return {
  checkboxes: any;
  handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const useMultipleCheckboxes = <T>(initialValues: T): T & Return => {
  const [checkboxes, setCheckboxes] = useState(initialValues);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const isChecked = event.target.checked;

    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
  };

  return {
    //? getters
    ...checkboxes,
    checkboxes,

    //? methods
    handleCheckboxChange,
  };
};
