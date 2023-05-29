import { ILogin } from "@/interfaces";

export const saveLoginData = (data: ILogin) => {
  localStorage.setItem("saved_user", JSON.stringify(data));
};

export const getLoginData = (): ILogin | false => {
  const loginData = localStorage.getItem("saved_user");
  if (!loginData) return false;

  return JSON.parse(loginData);
};

export const clearLoginData = () => localStorage.removeItem("saved_user");
