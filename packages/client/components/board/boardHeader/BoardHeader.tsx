import { useEffect, useState } from "react";
import { useFormik } from "formik";

//* icons *//
import { RiMoreFill } from "react-icons/ri";

//* form-initial-values and form-validations *//
import { formValidations, initialValues } from "./boardHeader.form";

//* stores *//
import { useBoardsStore, useBoardInterfaceStore } from "@/store";

//* interface *//
interface Props {
  boardId: string;
  boardName: string;
}

export const BoardHeader: React.FC<Props> = ({ boardId, boardName }) => {
  const { onUpdateBoard } = useBoardsStore();
  const { onToggleSidebar } = useBoardInterfaceStore();
  const [isInput, setIsInput] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialValues(boardName),
    validationSchema: formValidations(),
    onSubmit: async (formValues) => {
      try {
        await onUpdateBoard(boardId, formValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const $div = document.getElementById("name__edit");

    if (isInput) $div?.focus();
  }, [isInput]);

  return (
    <div className="flex w-full items-center p-2">
      <div className="max-w-full">
        <div
          id="name__edit"
          onBlur={() => {
            const newValue = document.getElementById("name__edit")?.innerText;

            formik.setFieldValue("name", newValue);
            if (newValue !== boardName) formik.handleSubmit();

            setIsInput(false);
          }}
          style={{ display: isInput ? "block" : "none" }}
          contentEditable
          className="max-w-[calc(100vw_-_60px)] overflow-hidden whitespace-nowrap rounded-sm bg-white px-3 text-xl font-bold text-black outline-emerald"
          dangerouslySetInnerHTML={{ __html: formik.values.name }}
        />
        <h1
          onClick={() => setIsInput(true)}
          style={{ display: isInput ? "none" : "block" }}
          className="cursor-pointer rounded-md py-[2px] px-3 text-xl font-bold text-white hover:bg-white/30"
        >
          {formik.values.name}
        </h1>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => onToggleSidebar(true)}
          className="rounded-md bg-white/30 p-[6px] hover:bg-white/40"
        >
          <RiMoreFill className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};
