import { NextPage } from "next";

//* components *//
import { SearchContainer } from "@/components/search";

//* layout *//
import { MainLayout } from "@/layouts";

const SearchPage: NextPage = () => {
  return (
    <MainLayout
      title="Buscar | Labor"
      description="Pagina para realizar busquedas en Labor"
    >
      <SearchContainer />
    </MainLayout>
  );
};

export default SearchPage;
