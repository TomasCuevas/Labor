import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

//* icons *//
import { RiAlignLeft, RiUserLine } from "react-icons/ri";

//* components *//
import { BoardSidebarHeader } from "@/components/board";

//* form-initial-values and form-validations *//
const initialValues = (description?: string) => ({
  description: description || "",
});

const formValidations = () => {
  return Yup.object({
    description: Yup.string().min(1).max(300).required(),
  });
};

//* store *//
import { useAuthStore, useBoardInterfaceStore, useBoardsStore } from "@/store";

export const AboutSection = () => {
  const { user } = useAuthStore();
  const { board, onSetBoard } = useBoardInterfaceStore();
  const { onUpdateBoard } = useBoardsStore();
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialValues(board?.description),
    validationSchema: formValidations(),
    onSubmit: async (formValues) => {
      try {
        const result = await onUpdateBoard(board!.id, formValues);
        onSetBoard(result);
      } catch (error) {
        console.error(error);
      }

      setIsInputOpen(false);
    },
  });

  return (
    <>
      <BoardSidebarHeader title="Acerca de este tablero" backAction="main" />
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-3 text-gray-700">
          <RiUserLine className="text-xl" />
          <span>Administradores del tablero</span>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald">
            <span className="text-xl uppercase text-white">
              {user!.name.slice(0, 2)}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-900">{user!.name}</span>
            <span className="text-sm text-gray-700">{user!.email}</span>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-3 text-gray-700">
          <RiAlignLeft className="text-xl" />
          <span>Descripción</span>
        </div>
        <div className="mt-4">
          {isInputOpen ? (
            <form onSubmit={formik.handleSubmit}>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="h-32 w-full resize-none rounded-md bg-gray-200 p-2 text-dark outline-none placeholder:text-dark/70"
                maxLength={300}
                placeholder="Introduzca una descripción..."
                autoFocus
              >
                {formik.values.description}
              </textarea>
              <div className="mt-1 flex items-center gap-2">
                <button
                  disabled={
                    formik.isSubmitting || formik.errors.description
                      ? true
                      : false
                  }
                  type="submit"
                  className="cursor-pointer rounded-md bg-emerald p-2 px-4 text-sm text-white hover:bg-emerald/80 disabled:cursor-not-allowed disabled:bg-dark/20"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setIsInputOpen(false)}
                  className="cursor-pointer rounded-md bg-gray-500 p-2 px-4 text-sm text-white hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsInputOpen(true)}
              className={`flex h-32 w-full rounded-md p-2 ${
                board!.description.trim().length > 0
                  ? "bg-gray-300/80"
                  : "bg-gray-300/40"
              }`}
            >
              <div className="flex w-full">
                <span className="text-left text-[15px] text-gray-700">
                  {board!.description.trim().length > 0
                    ? board!.description
                    : "Añada una descripción para que sus compañeros de equipo conozcan la finalidad del tablero."}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
