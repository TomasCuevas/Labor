import * as Yup from "yup";

export const initialValues = (description?: string) => ({
  description: description || "",
});

export const formValidations = () => {
  return Yup.object({
    description: Yup.string().max(300),
  });
};
