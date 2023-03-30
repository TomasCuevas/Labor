import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

//* providers *//
import {
  AuthProvider,
  BoardsProvider,
  HeaderProvider,
  TodosProvider,
} from "../context";

//* styles *//
import "../styles/globals.css";

//* create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BoardsProvider>
          <TodosProvider>
            <HeaderProvider>
              <SnackbarProvider maxSnack={3}>
                <Head>
                  <link
                    rel="shortcut icon"
                    href="/labor.svg"
                    type="image/x-icon"
                  />
                </Head>
                <Component {...pageProps} />
              </SnackbarProvider>
            </HeaderProvider>
          </TodosProvider>
        </BoardsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
