import type { NextPage } from "next";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { YourBoards, ClosedBoardsModal } from "@/components/board";

//* store *//
import { useBoardInterfaceStore } from "@/store";

const HomePage: NextPage = () => {
  const { closedBoardsModal } = useBoardInterfaceStore();

  return (
    <MainLayout
      title="Tableros | Labor"
      description="Página principal de Labor"
    >
      <YourBoards />
      {closedBoardsModal ? <ClosedBoardsModal /> : null}
    </MainLayout>
  );
};

export default HomePage;
