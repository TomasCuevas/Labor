import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

//* providers *//
import {
  AuthProvider,
  BoardsProvider,
  HeaderProvider,
  CardProvider,
} from "../context";

//* styles *//
import "../styles/globals.css";

//* create a client *//
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <BoardsProvider>
            <CardProvider>
              <HeaderProvider>
                <Head>
                  <link
                    rel="shortcut icon"
                    href="/labor.svg"
                    type="image/x-icon"
                  />
                </Head>
                <Component {...pageProps} />
              </HeaderProvider>
            </CardProvider>
          </BoardsProvider>
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
