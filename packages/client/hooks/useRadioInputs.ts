import { useState, ChangeEvent } from "react";

//* interface *//
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

  return {
    //? getters
    selectedInputs,

    //? methods
    onRadioChange,
  };
};
