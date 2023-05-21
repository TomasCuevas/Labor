import Head from "next/head";

export const FullLoader: React.FC = () => {
  return (
    <>
      <Head>
        <title>Cargando</title>
      </Head>
      <main>
        <div className="flex h-screen w-full items-center justify-center bg-[url(/background/labor_background.svg)] bg-cover bg-center">
          <span className="h-14 w-14 animate-spin rounded-full border-t-[6px] border-r border-t-emerald border-r-[#0000]"></span>
        </div>
      </main>
    </>
  );
};
