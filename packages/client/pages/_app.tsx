import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

//* store *//
import { useAuthStore } from "@/store";

//* styles *//
import "@/styles/globals.css";

//* create a client *//
export const queryClient = new QueryClient();

//* snackbar provider *//
export const snackbarProvider = React.createRef<SnackbarProvider>();

function MyApp({ Component, pageProps }: AppProps) {
  const { onCheckAuthentication } = useAuthStore();

  useEffect(() => {
    onCheckAuthentication();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3} ref={snackbarProvider}>
        <Head>
          <link rel="shortcut icon" href="/labor.svg" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
