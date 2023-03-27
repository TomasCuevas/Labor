import axios from "axios";
import Cookies from "js-cookie";

const boardsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/boards`,
});

boardsApi.interceptors.request.use((config) => {
  config.headers!["Authorization"] = `Bearer ${Cookies.get("labortoken")}`;
  return config;
});

export default boardsApi;
