import { create } from "zustand";

//* queryClient *//
import { queryClient } from "../pages/_app";

//* services *//
import { createBoardService } from "../services";

//* interface *//
interface useBoardsState {
  onCreateBoard(name: string): Promise<boolean>;
}

export const useBoardsStore = create<useBoardsState>(() => ({
  async onCreateBoard(name: string) {
    const result = await createBoardService(name);
    if (result.ok) {
      queryClient.invalidateQueries(["/boards"]);
      return true;
    } else {
      return false;
    }
  },
}));
