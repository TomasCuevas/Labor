import * as Yup from "yup";

//* interface *//
import { ICardStatus } from "@/interfaces";

export const initialValues = (
  title?: string,
  description?: string,
  status?: ICardStatus,
  labels?: string[]
) => ({
  title: title || "",
  description: description || "",
  status: status || "pending",
  labels: labels || [],
});

export const formValidations = () => {
  return Yup.object({
    title: Yup.string().min(1).max(50).required().trim(),
    description: Yup.string().min(1).max(300),
    status: Yup.string()
      .oneOf(["pending", "in-progress", "completed"])
      .required(),
    labels: Yup.array(),
  });
};
