import { FormEvent, useContext } from "react";

//* icons *//
import { RiArrowLeftSLine, RiCloseFill } from "react-icons/ri";

//* components *//
import { PopoverButton, PopoverInput } from "../";

//* hooks *//
import { useForm } from "../../../hooks/useForm";

//* context *//
import { BoardsContext, HeaderContext } from "../../../context";

export const CreateBoard: React.FC = () => {
  const { closeAllPops, onChangeCreateMenuState } = useContext(HeaderContext);
  const { onCreateBoard } = useContext(BoardsContext);
  const { boardTitle, onInputChange } = useForm({ boardTitle: "" });

  //! start create board
  const startCreateBoard = async (event: FormEvent) => {
    event.preventDefault();

    const result = await onCreateBoard(boardTitle);
    console.log(result);
  };

  return (
    <>
      <header className="relative mx-2 flex items-center justify-center">
        <h2 className="text-sm text-emerald">Crear tablero</h2>
        <button
          className="absolute left-0 text-lg"
          onClick={() => onChangeCreateMenuState("nothing")}
        >
          <RiArrowLeftSLine />
        </button>
        <button className="t absolute right-0 text-lg" onClick={closeAllPops}>
          <RiCloseFill />
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
