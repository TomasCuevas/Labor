import { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

//* components *//
import { FullLoader } from "../ui";

//* context *//
import { AuthContext } from "../../context";

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
  const { status } = useContext(AuthContext);
  const router = useRouter();

  if (status === "authenticated") router.replace("/");
  if (status === "not-authenticated") {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <main className="flex min-h-screen bg-dark p-4">{children}</main>
      </>
    );
  }

  return <FullLoader />;
};
