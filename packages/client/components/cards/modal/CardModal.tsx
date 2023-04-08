import { useContext } from "react";
import Swal from "sweetalert2";

//* icons *//
import {
  RiAlignLeft,
  RiCheckboxCircleLine,
  RiCloseFill,
  RiListSettingsLine,
  RiBookmarkLine,
  RiTodoLine,
} from "react-icons/ri";
import { MdSaveAlt, MdOutlineRemove } from "react-icons/md";

//* components *//
import { ModalActionButtom } from "../";

//* hooks *//
import { useForm, useRadioInputs } from "../../../hooks";

//* context *//
import { CardContext } from "../../../context";

//* interfaces *//
import { ICardStatus } from "../../../interfaces";

export const CardModal: React.FC = () => {
  const { cardModal, onClearCardModal, onUpdateCard, onDeleteCard } =
    useContext(CardContext);

  const { description, title, onInputChange } = useForm({
    title: cardModal!.title,
    description: cardModal!.description,
  });
  const { selectedInputs, onRadioChange } = useRadioInputs(
    [cardModal!.status],
    false
  );

  //! start update todo
  const startUpdateTodo = async () => {
    await onUpdateCard(
      { title, description, status: selectedInputs[0] as ICardStatus },
      cardModal!.id,
      cardModal!.board.id
    );

    onClearCardModal();
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
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteCard(cardModal!.id, cardModal!.board.id);
        onClearCardModal();
      }
    });
  };

  return (
    <div
      className="absolute top-0 left-0 flex h-screen w-screen items-start justify-center bg-dark/90 py-12"
      onClick={onClearCardModal}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-[95%] max-w-[768px] flex-col gap-5 rounded-md bg-white p-2"
      >
        <header className="flex w-full flex-col">
          <div className="flex gap-2">
            <div className="flex w-full items-center gap-2">
              <RiTodoLine className="text-xl text-dark" />
              <input
                type="text"
                value={title}
                onChange={onInputChange}
                name="title"
                className="w-full rounded-md border border-gray-100 px-2 py-1 outline-none focus:border-dark"
              />
            </div>
            <div className="flex items-center">
              <button
                onClick={onClearCardModal}
                className="rounded-full p-1 hover:bg-dark/20"
              >
                <RiCloseFill className="text-2xl text-dark" />
              </button>
            </div>
          </div>
          <div className="pl-9">
            <p className="text-sm text-gray-500">
              en la lista de{" "}
              <span className="relative text-gray-800 underline">
                {(cardModal!.status === "pending" && "Pendientes") ||
                  (cardModal!.status === "in-progress" && "En progreso") ||
                  (cardModal!.status === "completed" && "Completadas")}
              </span>
            </p>
          </div>
        </header>
        <section className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RiCheckboxCircleLine className="text-xl text-dark" />
            <h3 className="mt-[2px] text-dark">Estado</h3>
          </div>
          <form className="flex flex-wrap items-center gap-3 pl-9">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="pending"
                checked={selectedInputs.includes("pending")}
                onChange={onRadioChange}
              />
              <span className="mt-[1px] text-sm text-gray-600">Pendiente</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="in-progress"
                checked={selectedInputs.includes("in-progress")}
                onChange={onRadioChange}
              />
              <span className="mt-[1px] text-sm text-gray-600">
                En progreso
              </span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="completed"
                checked={selectedInputs.includes("completed")}
                onChange={onRadioChange}
              />
              <span className="mt-[1px] text-sm text-gray-600">Completada</span>
            </label>
          </form>
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RiAlignLeft className="text-xl text-dark" />
            <h3 className="mt-[2px] text-dark">Descripción</h3>
          </div>
          <form className="flex w-full gap-3 pl-9">
            <textarea
              name="description"
              value={description}
              maxLength={300}
              placeholder="Añadir una descripción más detallada..."
              className="flex h-20 w-full resize-none rounded-md border bg-gray-200 p-2 text-sm outline-none placeholder:text-sm placeholder:text-gray-500 focus:border-dark focus:bg-gray-100"
              onChange={onInputChange}
            >
              {description}
            </textarea>
          </form>
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RiListSettingsLine className="text-xl text-dark" />
            <h3 className="mt-[2px] text-dark">Acciones</h3>
          </div>
          <div className="flex gap-2 pl-9">
            <ModalActionButtom
              action={startUpdateTodo}
              text="Guardar"
              icon={MdSaveAlt}
              variant="success"
            />
            <ModalActionButtom
              action={startDeleteTodo}
              text="Eliminar"
              icon={MdOutlineRemove}
              variant="delete"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
