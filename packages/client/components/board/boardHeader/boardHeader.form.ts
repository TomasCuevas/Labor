import * as Yup from "yup";

export const initialValues = (name: string) => ({
  name: name,
});

export const formValidations = () => {
  return Yup.object({
    name: Yup.string().min(1).max(50).required(),
  });
};
