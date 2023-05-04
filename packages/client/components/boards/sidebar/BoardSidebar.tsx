//* components *//
import { AboutSection, BackgroundSection, MainSection } from "../";

//* store *//
import { useBoardInterfaceStore } from "../../../store";

export const BoardSidebar: React.FC = () => {
  const { sidebarSection } = useBoardInterfaceStore();

  return (
    <aside className="absolute right-0 top-[44px] flex h-[calc(100vh_-_44px)] w-[340px] flex-col items-center gap-4 bg-gray-200/80 px-3 backdrop-blur-2xl">
      {sidebarSection === "main" ? <MainSection /> : null}
      {sidebarSection === "about" ? <AboutSection /> : null}
      {sidebarSection === "background" ? <BackgroundSection /> : null}
    </aside>
  );
};
