import { createContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";

//* services *//
import { checkService, loginService, registerService } from "../../services";

//* interfaces *//
import { IAuthState, ILogin, IRegister } from "../../interfaces";

//* reducer *//
import { authReducer } from "./authReducer";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps extends IAuthState {
  onLogout(): void;
  onLogin(data: ILogin): Promise<{ ok: boolean; message?: string }>;
  onRegister(data: IRegister): Promise<{ ok: boolean; message?: string }>;
}

export const AuthContext = createContext({} as AuthContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    status: "checking",
    user: undefined,
  });

  useEffect(() => {
    onCheckAuthentication();
  }, []);

  //! check authentication
  const onCheckAuthentication = async () => {
    setChecking();

    const result = await checkService();
    if (!result.ok) {
      onLogout();
      return;
    }

    Cookies.set("labortoken", result.data.token);
    dispatch({
      type: "login",
      payload: { status: "authenticated", user: result.data.user },
    });
  };

  //! register
  const onRegister = async (registerData: IRegister) => {
    setChecking();

    const result = await registerService(registerData);
    if (!result.ok) {
      onLogout();
      return {
        ok: false,
        message: result.message,
      };
    }

    Cookies.set("labortoken", result.data.token);
    dispatch({
      type: "login",
      payload: { status: "authenticated", user: result.data.user },
    });

    return {
      ok: true,
    };
  };

  //! login
  const onLogin = async (loginData: ILogin) => {
    setChecking();

    const result = await loginService(loginData);
    if (!result.ok) {
      onLogout();
      return {
        ok: false,
        message: result.message,
      };
    }

    Cookies.set("labortoken", result.data.token);
    dispatch({
      type: "login",
      payload: { status: "authenticated", user: result.data.user },
    });

    return {
      ok: true,
    };
  };

  //! logout
  const onLogout = () => {
    Cookies.remove("labortoken");
    dispatch({
      type: "logout",
      payload: { status: "not-authenticated", user: undefined },
    });
  };

  //! set checking
  const setChecking = () => {
    dispatch({
      type: "checking",
      payload: { status: "checking", user: undefined },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        //? getters
        ...authState,

        //? methods
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
