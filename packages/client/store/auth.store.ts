import { create } from "zustand";
import Cookies from "js-cookie";

//* services *//
import { checkService, loginService, registerService } from "../services";

//* interfaces *//
import { IAuthState, ILogin, IRegister } from "../interfaces";

interface useAuthState extends IAuthState {
  setLogin(user: any, token: string): void;
  setLogout(): void;
  setChecking(): void;
  onCheckAuthentication(): Promise<void>;
  onLogin(data: ILogin): Promise<{ ok: boolean; message?: string }>;
  onRegister(data: IRegister): Promise<{ ok: boolean; message?: string }>;
}

export const useAuthStore = create<useAuthState>((set, get) => ({
  user: undefined,
  status: "checking",
  setLogin(user: any, token: string) {
    Cookies.set("labortoken", token);
    set(() => ({
      user: user,
      status: "authenticated",
    }));
  },
  setLogout() {
    Cookies.remove("labortoken");
    set(() => ({
      user: undefined,
      status: "not-authenticated",
    }));
  },
  setChecking() {
    set(() => ({
      user: undefined,
      status: "checking",
    }));
  },
  async onCheckAuthentication() {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    const result = await checkService();
    if (!result.ok) {
      setLogout();
      return;
    }

    setLogin(result.data.user, result.data.token);
  },
  async onLogin(loginData: ILogin) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    const result = await loginService(loginData);
    if (!result.ok) {
      setLogout();
      return {
        ok: false,
        message: result.message,
      };
    }

    setLogin(result.data.user, result.data.token);
    return {
      ok: true,
    };
  },
  async onRegister(registerData: IRegister) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    const result = await registerService(registerData);
    if (!result.ok) {
      setLogout();
      return {
        ok: false,
        message: result.message,
      };
    }

    setLogin(result.data.user, result.data.token);
    return {
      ok: true,
    };
  },
}));
