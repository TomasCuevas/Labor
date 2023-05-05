import { create } from "zustand";

//* interfaces *//
import { IBoard, IBoardSidebarSection } from "@/interfaces";

interface useBoardInterfaceState {
  sidebar: boolean;
  sidebarSection: IBoardSidebarSection;
  board?: IBoard;
  onSetSidebarSection(section: IBoardSidebarSection): void;
  onSetBoard(board: IBoard): void;
  onToggleSidebar(value: boolean): void;
}

export const useBoardInterfaceStore = create<useBoardInterfaceState>((set) => ({
  sidebar: false,
  sidebarSection: "main",
  board: undefined,
  onSetSidebarSection(section: IBoardSidebarSection) {
    set(() => ({
      sidebarSection: section,
    }));
  },
  onSetBoard(board: IBoard) {
    set(() => ({
      board,
    }));
  },
  onToggleSidebar(value: boolean) {
    set(() => ({
      sidebar: value,
      sidebarSection: "main",
    }));
  },
}));
