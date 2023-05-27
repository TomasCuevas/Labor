import { useState } from "react";
import { useFormik } from "formik";

//* icons *//
import { RiAddLine, RiCloseFill } from "react-icons/ri";

//* form-inital-values and form-validations *//
import { formValidations, initialValues } from "./newCard.form";

//* store *//
import { useCardsStore } from "@/store";

//* interfaces *//
import { ICardStatus } from "@/interfaces";

interface Props {
  status: ICardStatus;
  boardId: string;
}

export const NewCard: React.FC<Props> = ({ boardId, status }) => {
  const { onCreateCard } = useCardsStore();
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: formValidations(),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      const { title } = formValues;

      try {
        await onCreateCard({ title, status }, boardId);
        formik.resetForm();
        setIsInputOpen(false);
      } catch (error) {}
    },
  });

  if (isInputOpen) {
    return (
      <form onSubmit={formik.handleSubmit}>
        <div>
          <textarea
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="h-20 w-full resize-none rounded-md bg-slate-50 p-2  text-dark shadow-sm shadow-dark/20 outline-none drop-shadow-xl placeholder:text-dark/70"
            maxLength={50}
            placeholder="Introduzca un título para esta tarjeta..."
          >
            {formik.values.title}
          </textarea>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-emerald p-2 px-4 text-sm text-white hover:bg-emerald/80 disabled:cursor-not-allowed disabled:bg-dark/20"
            disabled={formik.errors.title ? true : false}
          >
            Añadir tarjeta
          </button>
          <button onClick={() => setIsInputOpen(false)}>
            <RiCloseFill className="text-2xl text-dark/80 hover:text-dark/50" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsInputOpen(true)}
      className="group flex w-full items-center gap-1 rounded-md px-2 py-1 hover:bg-zinc-300"
    >
      <RiAddLine className="text-gray-600 group-hover:text-gray-800" />
      <span className="text-gray-600 group-hover:text-gray-800">
        Añada una tarjeta
      </span>
    </button>
  );
};
