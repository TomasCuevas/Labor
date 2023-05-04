import { FormEvent } from "react";
import { useRouter } from "next/router";

//* icons *//
import { RiArrowLeftSLine, RiCloseFill } from "react-icons/ri";

//* components *//
import { PopoverButton, PopoverInput } from "../";

//* hooks *//
import { useForm } from "../../../hooks/useForm";

//* store *//
import { useBoardsStore, useHeaderStore } from "../../../store";

export const CreateBoard: React.FC = () => {
  const { onChangeMenuOpen, onChangeCreateMenuState } = useHeaderStore();
  const { onCreateBoard } = useBoardsStore();
  const { push } = useRouter();

  const { boardTitle, onInputChange } = useForm({ boardTitle: "" });

  //! start create board
  const startCreateBoard = async (event: FormEvent) => {
    event.preventDefault();

    const result = await onCreateBoard({ name: boardTitle });
    if (result.ok) {
      onChangeMenuOpen("nothing");
      push(`/boards/${result.board?.user.id}/${result.board?.name}`);
    }
  };

  return (
    <>
      <header className="relative mx-2 flex items-center justify-center">
        <h2 className="text-sm text-light">Crear tablero</h2>
        <button
          className="absolute left-0 text-lg"
          onClick={() => onChangeCreateMenuState("nothing")}
        >
          <RiArrowLeftSLine className="text-white" />
        </button>
        <button
          className="t absolute right-0 text-lg"
          onClick={() => onChangeMenuOpen("nothing")}
        >
          <RiCloseFill className="text-white" />
        </button>
      </header>
      <hr className="my-2" />
      <form
        className="mx-2 mt-2 flex flex-col gap-4"
        onSubmit={startCreateBoard}
      >
        <PopoverInput
          focus
          inputChange={onInputChange}
          inputName="boardTitle"
          inputValue={boardTitle}
          label="Título del tablero"
        />
        <PopoverButton
          isDisabled={boardTitle.length < 1}
          label="Crear"
          type="submit"
        />
      </form>
    </>
  );
};
