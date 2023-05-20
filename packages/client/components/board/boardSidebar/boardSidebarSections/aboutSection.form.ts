import * as Yup from "yup";

export const initialValues = (description?: string) => ({
  description: description || "",
});

export const formValidations = () => {
  return Yup.object({
    description: Yup.string().min(1).max(300).required(),
  });
};
