//* axios instance *//
import { authApi } from "@/axios";

//* interfaces *//
import { IRegister, ILogin, IUser } from "@/interfaces";

//! register [service]
export const registerService = async (
  registerData: IRegister
): Promise<{ token: string; user: IUser }> => {
  try {
    const { data } = await authApi.post("/register", registerData);

    return data;
  } catch (error: any) {
    throw error.response.data.message[0];
  }
};

//! login [service]
export const loginService = async (
  loginData: ILogin
): Promise<{ token: string; user: IUser }> => {
  try {
    const { data } = await authApi.post("/login", loginData);

    return data;
  } catch (error: any) {
    throw error.response.data.message[0];
  }
};

//! check [service]
export const checkService = async (): Promise<{
  token: string;
  user: IUser;
}> => {
  try {
    const { data } = await authApi.get("/check");

    return data;
  } catch (error) {
    throw error;
  }
};
