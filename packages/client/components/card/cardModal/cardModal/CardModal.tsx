import { useState, ChangeEvent } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";

//* icons *//
import {
  RiAlignLeft,
  RiCheckboxCircleLine,
  RiCloseFill,
  RiListSettingsLine,
  RiBookmarkLine,
  RiTodoLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { MdSaveAlt, MdOutlineRemove } from "react-icons/md";

//* data *//
import { labelColors } from "@/data";

//* components *//
import { ActionButtom, RadioInput, CheckboxInput } from "@/components/card";

//* form-initial-values and form-validations *//
import { formValidations, initialValues } from "./cardModal.form";

//* store *//
import { useCardsStore } from "@/store";

export const CardModal: React.FC = () => {
  const { cardModal, onToggleCardModal, onUpdateCard, onDeleteCard } =
    useCardsStore();
  const [labelForm, setLabelForm] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialValues(
      cardModal?.title,
      cardModal?.description,
      cardModal?.status,
      cardModal?.labels
    ),
    validationSchema: formValidations(),
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      try {
        await onUpdateCard(formValues, cardModal!.id, cardModal!.board.id);
        onToggleCardModal(undefined);
      } catch (error) {}
    },
  });

  //! handleLabels
  const handleLabels = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      formik.setFieldValue("labels", [
        ...formik.values.labels,
        `${target.value}`,
      ]);
    } else {
      formik.setFieldValue(
        "labels",
        formik.values.labels.filter((option) => option !== `${target.value}`)
      );
    }
  };

  //! start delete todo
  const startDeleteTodo = async () => {
    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar esta tarjeta?",
      text: "No podras recuperar esta tarjeta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#0d132c",
      confirmButtonText: "Eliminar tarjeta",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDeleteCard(cardModal!.id, cardModal!.board.id);
          onToggleCardModal(undefined);
        } catch (error) {}
      }
    });
  };

  return (
    <div
      className="absolute top-0 left-0 z-20 flex h-screen w-screen items-start justify-center bg-dark/90 py-12"
      onClick={() => onToggleCardModal(undefined)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[95%] max-w-[768px] rounded-md bg-white p-2"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-full flex-col gap-5 p-2"
        >
          <header className="flex w-full flex-col">
            <div className="flex gap-2">
              <div className="flex w-full items-center gap-2">
                <RiTodoLine className="text-xl text-dark" />
                <input
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  name="title"
                  className="w-full rounded-md border border-gray-100 px-2 py-1 outline-none focus:border-dark"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => onToggleCardModal(undefined)}
                  className="group rounded-full shadow-md hover:bg-dark"
                >
                  <RiCloseFill className=" text-[27px] text-dark group-hover:text-white" />
                </button>
              </div>
            </div>
            <div className="pl-9">
              <p className="text-sm text-gray-500">
                en la lista de{" "}
                <span className="relative text-gray-800 underline">
                  {cardModal!.status === "pending" && "Pendientes"}
                  {cardModal!.status === "in-progress" && "En progreso"}
                  {cardModal!.status === "completed" && "Completadas"}
                </span>
              </p>
            </div>
          </header>
          <section className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <RiCheckboxCircleLine className="text-xl text-dark" />
              <h3 className="mt-[2px] text-dark">Estado</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 pl-9">
              <RadioInput
                checked={formik.values.status === "pending"}
                value="pending"
                inputName="status"
                label="Pendiente"
                onChange={formik.handleChange}
              />
              <RadioInput
                checked={formik.values.status === "in-progress"}
                value="in-progress"
                inputName="status"
                label="En progreso"
                onChange={formik.handleChange}
              />
              <RadioInput
                checked={formik.values.status === "completed"}
                value="completed"
                inputName="status"
                label="Completada"
                onChange={formik.handleChange}
              />
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <RiBookmarkLine className="text-xl text-dark" />
              <h3 className="mt-[2px] text-dark">Etiqueta</h3>
              {labelForm ? (
                <button
                  type="button"
                  className="group ml-auto cursor-pointer rounded-full shadow-md duration-200 hover:bg-black"
                >
                  <RiArrowUpSLine
                    onClick={() => setLabelForm(false)}
                    className="text-[28px] text-dark group-hover:text-white"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="group ml-auto cursor-pointer rounded-full shadow-md duration-200 hover:bg-black"
                >
                  <RiArrowDownSLine
                    onClick={() => setLabelForm(true)}
                    className="text-[28px] text-dark group-hover:text-white"
                  />
                </button>
              )}
            </div>
            <div
              style={{ display: labelForm ? "flex" : "none" }}
              className="flex flex-col gap-1 pl-9"
            >
              <CheckboxInput
                color={labelColors.blue}
                name="blue"
                value="blue"
                checked={formik.values.labels.includes("blue")}
                onChange={(event) => handleLabels(event)}
              />
              <CheckboxInput
                color={labelColors.green}
                name="green"
                value="green"
                checked={formik.values.labels.includes("green")}
                onChange={(event) => handleLabels(event)}
              />
              <CheckboxInput
                color={labelColors.orange}
                name="orange"
                value="orange"
                checked={formik.values.labels.includes("orange")}
                onChange={(event) => handleLabels(event)}
              />
              <CheckboxInput
                color={labelColors.red}
                name="red"
                value="red"
                checked={formik.values.labels.includes("red")}
                onChange={(event) => handleLabels(event)}
              />
              <CheckboxInput
                color={labelColors.violet}
                name="violet"
                value="violet"
                checked={formik.values.labels.includes("violet")}
                onChange={(event) => handleLabels(event)}
              />
              <CheckboxInput
                color={labelColors.yellow}
                name="yellow"
                value="yellow"
                checked={formik.values.labels.includes("yellow")}
                onChange={(event) => handleLabels(event)}
              />
            </div>
          </section>
          <section className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <RiAlignLeft className="text-xl text-dark" />
              <h3 className="mt-[2px] text-dark">Descripción</h3>
            </div>
            <div className="flex w-full gap-3 pl-9">
              <textarea
                name="description"
                value={formik.values.description}
                maxLength={300}
                placeholder="Añadir una descripción más detallada..."
                className="flex h-20 w-full resize-none rounded-md border bg-gray-200 p-2 text-sm outline-none placeholder:text-sm placeholder:text-gray-500 focus:border-dark focus:bg-gray-100"
                onChange={formik.handleChange}
              >
                {formik.values.description}
              </textarea>
            </div>
          </section>
          <footer className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <RiListSettingsLine className="text-xl text-dark" />
              <h3 className="mt-[2px] text-dark">Acciones</h3>
            </div>
            <div className="flex gap-2 pl-9">
              <ActionButtom
                type="submit"
                text="Guardar"
                icon={MdSaveAlt}
                variant="success"
                disabled={
                  formik.errors.title ||
                  formik.errors.status ||
                  formik.errors.description
                    ? true
                    : false
                }
              />
              <ActionButtom
                type="button"
                onSubmit={startDeleteTodo}
                text="Eliminar"
                icon={MdOutlineRemove}
                variant="delete"
              />
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};
