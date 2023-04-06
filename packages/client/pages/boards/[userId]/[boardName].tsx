import { useContext } from "react";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";

//* components *//
import { Board } from "../../../components/boards";
import { TodoModal } from "../../../components/todos";

//* layout *//
import { MainLayout } from "../../../layouts";

//* context *//
import { TodosContext } from "../../../context";

//* interfaces *//
import { IBoard } from "../../../interfaces";

interface Props {
  board: IBoard;
}

const BoardPage: NextPage<Props> = ({ board }) => {
  const { todoModal } = useContext(TodosContext);

  return (
    <MainLayout
      title={`${board.name} | Labor`}
      description={`Pagina dedicada al tablero ${board.name} creado por ${board.user.name}`}
    >
      <Board boardId={board.id} />
      {todoModal && <TodoModal />}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req: { cookies },
}) => {
  const token = cookies.labortoken;
  const { boardName } = params as {
    boardName: string;
  };

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/boards/${boardName}`
  );

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      board: data,
    },
  };
};

export default BoardPage;
