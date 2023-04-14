import { MouseEvent, useState } from "react";

//* icons *//
import { RiAddLine, RiCloseFill } from "react-icons/ri";

//* hooks *//
import { useForm } from "../../hooks";

//* store *//
import { useCardsStore } from "../../store";

//* interface *//
import { ICardStatus } from "../../interfaces";

interface Props {
  status: ICardStatus;
  boardId: string;
}

export const NewCard: React.FC<Props> = ({ boardId, status }) => {
  const { onCreateCard } = useCardsStore();
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  const { title, onInputChange, reset } = useForm({
    title: "",
  });

  //! start create card
  const startCreateCard = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await onCreateCard({ title, status }, boardId);
    setIsInputOpen(false);
    reset();
  };

  if (isInputOpen) {
    return (
      <div>
        <div>
          <textarea
            name="title"
            value={title}
            onChange={onInputChange}
            className="h-20 w-full resize-none rounded-md bg-slate-50 p-2  text-dark shadow-sm shadow-dark/50 outline-none placeholder:text-dark/70"
            maxLength={50}
            placeholder="Introduzca un título para esta tarjeta..."
          >
            {title}
          </textarea>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <button
            type="submit"
            onClick={startCreateCard}
            className="cursor-pointer rounded-md bg-emerald p-2 px-4 text-sm text-white hover:bg-emerald/80"
          >
            Añadir tarjeta
          </button>
          <button onClick={() => setIsInputOpen(false)}>
            <RiCloseFill className="text-2xl text-dark/80 hover:text-dark/50" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsInputOpen(true)}
      className="flex w-full items-center gap-1 rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300"
    >
      <RiAddLine className="text-gray-600" />
      <span className="text-gray-600">Añada una tarjeta</span>
    </button>
  );
};
