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

//* data *//
import { labelColors } from "../../../data";

//* components *//
import { LabelInput, ModalActionButtom, RadioInput } from "../";

//* hooks *//
import { useForm, useMultipleCheckboxes, useRadioInputs } from "../../../hooks";

//* store *//
import { useCardsStore } from "../../../store";

//* interfaces *//
import { ICardStatus } from "../../../interfaces";

export const CardModal: React.FC = () => {
  const { cardModal, onToggleCardModal, onUpdateCard, onDeleteCard } =
    useCardsStore();

  const { description, title, onInputChange } = useForm({
    title: cardModal!.title,
    description: cardModal!.description,
  });
  const { selectedInputs, onRadioChange } = useRadioInputs(
    [cardModal!.status],
    false
  );
  const { checkboxes, handleCheckboxChange } = useMultipleCheckboxes({
    blue: cardModal!.labels.includes("blue"),
    green: cardModal!.labels.includes("green"),
    orange: cardModal!.labels.includes("orange"),
    red: cardModal!.labels.includes("red"),
    violet: cardModal!.labels.includes("violet"),
    yellow: cardModal!.labels.includes("yellow"),
  });

  //! start update todo
  const startUpdateTodo = async () => {
    const labels = [];

    for (const label in checkboxes) {
      if (checkboxes[label] === true) labels.push(label);
    }

    console.log(labels);

    await onUpdateCard(
      { title, description, status: selectedInputs[0] as ICardStatus, labels },
      cardModal!.id,
      cardModal!.board.id
    );

    onToggleCardModal(undefined);
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
        onToggleCardModal(undefined);
      }
    });
  };

  return (
    <div
      className="absolute top-0 left-0 flex h-screen w-screen items-start justify-center bg-dark/90 py-12"
      onClick={() => onToggleCardModal(undefined)}
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
                onClick={() => onToggleCardModal(undefined)}
                className="rounded-full hover:bg-dark/20"
              >
                <RiCloseFill className="text-[27px] text-dark" />
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
            <RadioInput
              checked={selectedInputs.includes("pending")}
              inputName="pending"
              label="Pendiente"
              onChange={onRadioChange}
            />
            <RadioInput
              checked={selectedInputs.includes("in-progress")}
              inputName="in-progress"
              label="En progreso"
              onChange={onRadioChange}
            />
            <RadioInput
              checked={selectedInputs.includes("completed")}
              inputName="completed"
              label="Completada"
              onChange={onRadioChange}
            />
          </form>
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RiBookmarkLine className="text-xl text-dark" />
            <h3 className="mt-[2px] text-dark">Etiqueta</h3>
          </div>
          <form className="flex flex-col gap-1 pl-9">
            <LabelInput
              color={labelColors.blue}
              name="blue"
              value={checkboxes.blue}
              onChange={handleCheckboxChange}
            />
            <LabelInput
              color={labelColors.green}
              name="green"
              onChange={handleCheckboxChange}
              value={checkboxes.green}
            />
            <LabelInput
              color={labelColors.orange}
              name="orange"
              onChange={handleCheckboxChange}
              value={checkboxes.orange}
            />
            <LabelInput
              color={labelColors.red}
              name="red"
              onChange={handleCheckboxChange}
              value={checkboxes.red}
            />
            <LabelInput
              color={labelColors.violet}
              name="violet"
              onChange={handleCheckboxChange}
              value={checkboxes.violet}
            />
            <LabelInput
              color={labelColors.yellow}
              name="yellow"
              onChange={handleCheckboxChange}
              value={checkboxes.yellow}
            />
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
