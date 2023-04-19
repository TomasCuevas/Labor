import { useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";

//* components *//
import { Board, BoardHeader, BoardSidebar } from "../../../components/boards";
import { CardModal } from "../../../components/cards";

//* layout *//
import { MainLayout } from "../../../layouts";

//* store *//
import { useBoardInterfaceStore, useCardsStore } from "../../../store";

//* interfaces *//
import { IBoard, ICard } from "../../../interfaces";

interface Props {
  board: IBoard;
  modalCard?: ICard;
}

const BoardPage: NextPage<Props> = ({ board, modalCard }) => {
  const { cardModal, onToggleCardModal } = useCardsStore();
  const { onSetBoard, sidebar } = useBoardInterfaceStore();

  useEffect(() => {
    if (modalCard) onToggleCardModal(modalCard);
    onSetBoard(board);
  }, []);

  return (
    <MainLayout
      title={`${board.name} | Labor`}
      description={`Pagina dedicada al tablero ${board.name} creado por ${board.user.name}`}
    >
      <div
        className="flex h-full w-full flex-col bg-cover bg-center bg-no-repeat pt-11"
        style={{
          backgroundImage: `url(/board_background/${board.background}.svg)`,
        }}
      >
        <BoardHeader boardName={board.name} />
        <Board boardId={board.id} />
      </div>
      {cardModal ? <CardModal /> : null}
      {sidebar ? <BoardSidebar /> : null}
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
