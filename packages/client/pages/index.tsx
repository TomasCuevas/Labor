import type { NextPage } from "next";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { YourBoards } from "@/components/boards";

const HomePage: NextPage = () => {
  return (
    <MainLayout
      title="Tableros | Labor"
      description="Página principal de Labor"
    >
      <YourBoards />
    </MainLayout>
  );
};

export default HomePage;
