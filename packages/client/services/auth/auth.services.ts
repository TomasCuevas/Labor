//* axios instance *//
import { authApi } from "@/api";

//* interfaces *//
import { IRegister, ILogin } from "@/interfaces";

//! register service
export const registerService = async (registerData: IRegister) => {
  try {
    const { data } = await authApi.post("/register", registerData);

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.response.data.message[0],
    };
  }
};

//! login service
export const loginService = async (loginData: ILogin) => {
  try {
    const { data } = await authApi.post("/login", loginData);

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.response.data.message[0],
    };
  }
};

//! check service
export const checkService = async () => {
  try {
    const { data } = await authApi.get("/check");

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
