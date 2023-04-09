import { useContext, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";

//* components *//
import { Board } from "../../../components/boards";
import { CardModal } from "../../../components/cards";

//* layout *//
import { MainLayout } from "../../../layouts";

//* context *//
import { CardContext } from "../../../context";

//* interfaces *//
import { IBoard, ICard } from "../../../interfaces";

interface Props {
  board: IBoard;
  modalCard?: ICard;
}

const BoardPage: NextPage<Props> = ({ board, modalCard }) => {
  const { cardModal, onSetCardModal } = useContext(CardContext);

  useEffect(() => {
    if (!modalCard) return;
    if (modalCard) onSetCardModal(modalCard);
  }, []);

  return (
    <MainLayout
      title={`${board.name} | Labor`}
      description={`Pagina dedicada al tablero ${board.name} creado por ${board.user.name}`}
    >
      <Board boardId={board.id} />
      {cardModal && <CardModal />}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
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

  const { modal } = query as { modal: string };

  if (!modal) {
    return {
      props: {
        board: data,
      },
    };
  }

  const { data: modalData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/cards/${modal}`
  );

  return {
    props: {
      board: data,
      modalCard: modalData,
    },
  };
};

export default BoardPage;
