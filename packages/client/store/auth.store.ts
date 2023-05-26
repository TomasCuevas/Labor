import { create } from "zustand";
import Cookies from "js-cookie";

//* services *//
import { checkService, loginService, registerService } from "@/services";

//* interfaces *//
import { IAuthState, ILogin, IRegister } from "@/interfaces";

interface useAuthState extends IAuthState {
  setLogin(user: any, token: string): void;
  setLogout(): void;
  setChecking(): void;
  onCheckAuthentication(): Promise<void>;
  onLogin(data: ILogin): Promise<void>;
  onRegister(data: IRegister): Promise<void>;
}

export const useAuthStore = create<useAuthState>((set, get) => ({
  user: undefined,
  status: "checking",

  //! set login
  setLogin(user: any, token: string) {
    Cookies.set("labortoken", token);
    set(() => ({
      user: user,
      status: "authenticated",
    }));
  },

  //! set logout
  setLogout() {
    Cookies.remove("labortoken");
    set(() => ({
      user: undefined,
      status: "not-authenticated",
    }));
  },

  //! set checking
  setChecking() {
    set(() => ({
      user: undefined,
      status: "checking",
    }));
  },

  //! check authentication
  async onCheckAuthentication() {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    try {
      const { token, user } = await checkService();
      setLogin(user, token);
    } catch (error) {
      setLogout();
      throw error;
    }
  },

  //! login
  async onLogin(loginData: ILogin) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    try {
      const { token, user } = await loginService(loginData);
      setLogin(user, token);
    } catch (error) {
      setLogout();
      throw error;
    }
  },

  //! register
  async onRegister(registerData: IRegister) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    try {
      const { token, user } = await registerService(registerData);
      setLogin(user, token);
    } catch (error) {
      setLogout();
      throw error;
    }
  },
}));
