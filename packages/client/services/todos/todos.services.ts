import { boardsApi, todosApi } from "../../api";

//* interfaces *//
import { ITodo, ITodoForCreate, ITodoForUpdate } from "../../interfaces";

//! create todo [service]
export const createTodoService = async (
  todo: ITodoForCreate,
  boardId: string
): Promise<{ ok: boolean; todo?: ITodo }> => {
  try {
    const { data } = await todosApi.post("/create", { ...todo, boardId });

    return {
      ok: true,
      todo: data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
    };
  }
};

//! get all todos by board [service]
export const getAllTodosByBoardService = async (
  boardId: string
): Promise<ITodo[]> => {
  try {
    const { data } = await boardsApi.get(`/${boardId}/todos`);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las tareas del tablero.");
  }
};

//! update todo [service]
export const updateTodoService = async (
  todoToUpdate: ITodoForUpdate,
  todoId: string
): Promise<{ ok: boolean; todo?: ITodo }> => {
  try {
    const { data } = await todosApi.patch(`/update/${todoId}`, todoToUpdate);

    return {
      ok: true,
      todo: data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
    };
  }
};

//! remove todo [service]
export const removeTodoService = async (todoId: string) => {
  try {
    await todosApi.delete(`/delete/${todoId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
