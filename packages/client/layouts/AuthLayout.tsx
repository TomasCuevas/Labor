import { useRouter } from "next/router";
import Head from "next/head";

//* components *//
import { FullLoader } from "@/components/ui";

//* context *//
import { useAuthStore } from "@/store";

//* interface *//
interface Props {
  children: React.ReactNode;
  description: string;
  title: string;
}

export const AuthLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  const { status } = useAuthStore();
  const { replace } = useRouter();

  if (status === "authenticated") replace("/");
  if (status === "not-authenticated") {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <main className="flex h-screen  bg-[url('/background/labor_background.svg')]">
          {children}
        </main>
      </>
    );
  }

  return <FullLoader />;
};
