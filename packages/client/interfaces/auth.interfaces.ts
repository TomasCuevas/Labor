export interface IAuthState {
  status: "authenticated" | "not-authenticated" | "checking";
  user?: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface IRegister {
  email: string;
  name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
