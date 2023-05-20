import * as Yup from "yup";

export const initialValues = () => ({
  title: "",
});

export const formValidations = () => {
  return Yup.object({
    title: Yup.string().min(1).max(50).required().trim(),
  });
};
