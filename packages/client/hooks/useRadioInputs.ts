import { useState, ChangeEvent } from "react";

interface Return {
  selectedInputs: string | string[];
  onRadioChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const useRadioInputs = (
  initialState: string[],
  allowMultipleSelections: boolean
): Return => {
  const [selectedInputs, setSelectedInputs] = useState<string[]>(initialState);

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (allowMultipleSelections) {
      let newState = selectedInputs;
      newState.push(name);

      if (selectedInputs.includes(name)) newState.pop();

      setSelectedInputs(newState);
    } else {
      setSelectedInputs([name]);
    }
  };

  // const [selectedInputs, setSelectedInputs] = useState<Record<string, boolean>>(
  //   inputNames.reduce((object: Record<string, boolean>, input) => {
  //     object[input] = inputChecked && inputChecked === input ? true : false;
  //     return object;
  //   }, {})
  // );

  // const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = event.target;

  //   if (allowMultipleSelections) {
  //     setSelectedInputs((prevSelectedInputs) => ({
  //       ...prevSelectedInputs,
  //       [name]: checked,
  //     }));
  //   } else {
  //     setSelectedInputs((prevObj) => ({
  //       ...Object.fromEntries(
  //         Object.entries(prevObj).map(([obj]) => [obj, false])
  //       ),
  //       [name]: checked,
  //     }));
  //   }
  // };

  return {
    //? getters
    selectedInputs,

    //? methods
    onRadioChange,
  };
};
