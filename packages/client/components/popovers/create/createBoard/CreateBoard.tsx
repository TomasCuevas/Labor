import { useRouter } from "next/router";
import { useFormik } from "formik";

//* icons *//
import { RiArrowLeftSLine, RiCloseFill } from "react-icons/ri";

//* components *//
import { PopoverButton, PopoverInput } from "@/components/popovers";

//* form-initial-values and form-validations *//
import { formValidations, initialValues } from "./createBoard.form";

//* stores *//
import { useBoardsStore, useHeaderStore } from "@/store";

export const CreateBoard: React.FC = () => {
  const { onChangeMenuOpen, onChangeCreateMenuState } = useHeaderStore();
  const { onCreateBoard } = useBoardsStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: formValidations(),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      try {
        const board = await onCreateBoard(formValues);
        onChangeMenuOpen("nothing");
        router.push(`/boards/${board.user.id}/${board.name}`);
      } catch (error) {}
    },
  });

  return (
    <>
      <header className="relative mx-2 flex items-center justify-center pt-2">
        <h2 className="text-sm text-emerald">Crear tablero</h2>
        <button
          className="absolute left-0 text-lg"
          onClick={() => onChangeCreateMenuState("nothing")}
        >
          <RiArrowLeftSLine className="text-black" />
        </button>
        <button
          className="t absolute right-0 text-lg"
          onClick={() => onChangeMenuOpen("nothing")}
        >
          <RiCloseFill className="text-black" />
        </button>
      </header>
      <hr className="my-2" />
      <form
        className="mx-2 mt-2 flex flex-col gap-4 pb-2"
        onSubmit={formik.handleSubmit}
      >
        <PopoverInput
          focus
          inputChange={formik.handleChange}
          inputName="name"
          inputValue={formik.values.name}
          label="Título del tablero"
        />
        <PopoverButton
          isDisabled={formik.errors.name ? true : false}
          label="Crear"
          type="submit"
        />
      </form>
    </>
  );
};
