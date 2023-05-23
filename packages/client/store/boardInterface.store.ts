import { create } from "zustand";

//* interfaces *//
import { IBoard, IBoardSidebarSection } from "@/interfaces";

interface useBoardInterfaceState {
  closedBoardsModal: boolean;
  sidebar: boolean;
  sidebarSection: IBoardSidebarSection;
  board?: IBoard;
  onToggleClosedBoardsModal(value: boolean): void;
  onSetSidebarSection(section: IBoardSidebarSection): void;
  onSetBoard(board: IBoard): void;
  onToggleSidebar(value: boolean): void;
}

export const useBoardInterfaceStore = create<useBoardInterfaceState>((set) => ({
  closedBoardsModal: false,
  sidebar: false,
  sidebarSection: "main",
  board: undefined,
  onToggleClosedBoardsModal(value: boolean) {
    set(() => ({ closedBoardsModal: value }));
  },
  onSetBoard(board: IBoard) {
    set(() => ({ board }));
  },
  onSetSidebarSection(section: IBoardSidebarSection) {
    set(() => ({ sidebarSection: section }));
  },
  onToggleSidebar(value: boolean) {
    set(() => ({ sidebar: value, sidebarSection: "main" }));
  },
}));
