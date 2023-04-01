import { createContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

//* services *//
import {
  createTodoService,
  removeTodoService,
  updateTodoService,
} from "../../services";

//* interfaces
import { ITodo, ITodoForCreate, ITodoForUpdate } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//
interface TodosContextProps {
  isTodoDragging: boolean;
  todoModal: ITodo | undefined;
  onCreateTodo(todo: ITodoForCreate, boardId: string): Promise<void>;
  onToggleTodoDragging(newValue: boolean): void;
  onDeleteTodo(todoId: string, boardId: string): Promise<void>;
  onUpdateTodo(
    todoToUpdate: ITodoForUpdate,
    todoId: string,
    boardId: string
  ): Promise<void>;
  onClearTodoModal(): void;
  onSetTodoModal(todo: ITodo): void;
}

export const TodosContext = createContext({} as TodosContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface TodosProviderProps {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [isTodoDragging, setIsTodoDragging] = useState<boolean>(false);
  const [todoModal, setTodoModal] = useState<ITodo>();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  //! toggle dragging
  const onToggleTodoDragging = (newValue: boolean) => {
    return setIsTodoDragging(newValue);
  };

  //! set todo on popup
  const onSetTodoModal = (todo: ITodo) => setTodoModal(todo);

  //! clear todo on popup
  const onClearTodoModal = () => setTodoModal(undefined);

  //! create todo
  const onCreateTodo = async (
    todo: ITodoForCreate,
    boardId: string
  ): Promise<void> => {
    const result = await createTodoService(todo, boardId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
    }
  };

  //! update todo
  const onUpdateTodo = async (
    todoToUpdate: ITodoForUpdate,
    todoId: string,
    boardId: string
  ) => {
    const result = await updateTodoService(todoToUpdate, todoId);
    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      enqueueSnackbar("Tarjeta actualizada", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar("Error al actualizar la tarjeta.", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  //! delete todo
  const onDeleteTodo = async (todoId: string, boardId: string) => {
    const result = await removeTodoService(todoId);

    if (result.ok) {
      queryClient.invalidateQueries([`/boards/${boardId}/todos`]);
      enqueueSnackbar("Tarjeta eliminada con exito.", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar("Error al eliminar la tarjeta.", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <TodosContext.Provider
      value={{
        //? getters
        isTodoDragging,
        todoModal,

        //? methods
        onClearTodoModal,
        onCreateTodo,
        onDeleteTodo,
        onSetTodoModal,
        onToggleTodoDragging,
        onUpdateTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
