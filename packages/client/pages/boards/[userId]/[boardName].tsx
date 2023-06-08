import { useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";

//* components *//
import {
  Board,
  BoardHeader,
  BoardIsClosed,
  BoardSidebar,
} from "@/components/board";
import { CardModal } from "@/components/card";

//* layout *//
import { MainLayout } from "@/layouts";

//* store *//
import { useBoardInterfaceStore, useCardsStore } from "@/store";

//* interfaces *//
import { IBoard, ICard } from "@/interfaces";

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
  }, [boardProp]);

  useEffect(() => {
    const newUrl = `/boards/${board?.user.id}/${board?.name}`;
    window.history.replaceState({}, "", newUrl);
  }, [board?.name]);

  return (
    <MainLayout
      title={`${board ? board.name : boardProp.name} | Labor`}
      description={`Pagina dedicada al tablero ${
        board ? board.name : boardProp.name
      } creado por ${board ? board.user.name : boardProp.user.name}`}
    >
      <div
        className="relative flex h-full w-full flex-col bg-cover bg-center bg-no-repeat pt-11"
        style={{
          backgroundImage: `url(/board_background/${
            board ? board.background : boardProp.background
          }.svg)`,
        }}
      >
        {boardProp.status === "open" ? (
          <>
            <BoardHeader boardName={boardProp.name} boardId={boardProp.id} />
            <Board boardId={boardProp.id} />
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
  const { modal } = query as { modal: string };
  const { boardName } = params as {
    boardName: string;
  };

  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/${boardName}`
    );

    if (!data) throw new Error();

    if (!modal) {
      return {
        props: {
          boardProp: data,
        },
      };
    }

    try {
      const { data: modalData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cards/${modal}`
      );

      return {
        props: {
          boardProp: data,
          modalCard: modalData,
        },
      };
    } catch (error) {
      return {
        props: {
          boardProp: data,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default BoardPage;
