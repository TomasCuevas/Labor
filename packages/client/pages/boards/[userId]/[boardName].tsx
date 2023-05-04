import { useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";

//* components *//
import {
  Board,
  BoardHeader,
  BoardIsClosed,
  BoardSidebar,
} from "../../../components/boards";
import { CardModal } from "../../../components/cards";

//* layout *//
import { MainLayout } from "../../../layouts";

//* store *//
import { useBoardInterfaceStore, useCardsStore } from "../../../store";

//* interfaces *//
import { IBoard, ICard } from "../../../interfaces";

interface Props {
  boardProp: IBoard;
  modalCard?: ICard;
}

const BoardPage: NextPage<Props> = ({ boardProp, modalCard }) => {
  const { cardModal, onToggleCardModal } = useCardsStore();
  const { board, onSetBoard, sidebar } = useBoardInterfaceStore();

  useEffect(() => {
    if (modalCard && boardProp.status === "open") onToggleCardModal(modalCard);
    onSetBoard(boardProp);
  }, []);

  return (
    <MainLayout
      title={`${boardProp?.name} | Labor`}
      description={`Pagina dedicada al tablero ${boardProp?.name} creado por ${boardProp?.user.name}`}
    >
      <div
        className="relative flex h-full w-full flex-col bg-cover bg-center bg-no-repeat pt-11"
        style={{
          backgroundImage: `url(/board_background/${board?.background}.svg)`,
        }}
      >
        {boardProp.status === "open" ? (
          <>
            <BoardHeader boardName={boardProp?.name} />
            <Board boardId={boardProp?.id} />
          </>
        ) : (
          <BoardIsClosed board={boardProp} />
        )}
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
        boardProp: data,
      },
    };
  }

  const { data: modalData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/cards/${modal}`
  );

  return {
    props: {
      boardProp: data,
      modalCard: modalData,
    },
  };
};

export default BoardPage;
