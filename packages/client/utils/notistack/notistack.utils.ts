import { snackbarProvider } from "@/pages/_app";

export const notiSuccess = (menssaje: string) => {
  snackbarProvider.current?.enqueueSnackbar(menssaje, {
    variant: "success",
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};

export const notiError = (menssaje: string) => {
  snackbarProvider.current?.enqueueSnackbar(menssaje, {
    variant: "error",
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};
