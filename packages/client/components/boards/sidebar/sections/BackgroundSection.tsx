//* data *//
import { backgroundColors } from "../../../../data";

//* components *//
import { BackgroundCard, BoardSidebarHeader } from "../../";

//* store *//
import { useBoardInterfaceStore } from "../../../../store";

export const BackgroundSection: React.FC = () => {
  const { board } = useBoardInterfaceStore();

  return (
    <>
      <BoardSidebarHeader title="Cambiar fondo" backAction="main" />
      <div className="grid w-full grid-cols-2 gap-2">
        {Object.keys(backgroundColors).map((background) => (
          <BackgroundCard
            key={background}
            background={background}
            isSelected={board!.background === background}
          />
        ))}
      </div>
    </>
  );
};
