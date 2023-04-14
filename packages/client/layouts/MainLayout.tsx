import Head from "next/head";
import { useRouter } from "next/router";

//* components *//
import { Header } from "../components/header";
import { FullLoader } from "../components/ui";
import {
  AccountMenuPopover,
  CreateMenuPopover,
  SearchMenuPopover,
} from "../components/popovers";

//* store *//
import { useAuthStore } from "../store";

//* interface
interface Props {
  children: React.ReactNode;
  description: string;
  title: string;
}

export const MainLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  const { status } = useAuthStore();
  const router = useRouter();

  if (status === "not-authenticated") router.replace("/auth/login");
  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>

        <Header />
        <AccountMenuPopover />
        <CreateMenuPopover />
        <SearchMenuPopover />

        <main className="mt-11 flex min-h-[calc(100vh_-_44px)] w-full bg-dark">
          {children}
        </main>
      </>
    );
  }

  return <FullLoader />;
};
