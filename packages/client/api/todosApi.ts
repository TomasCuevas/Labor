import axios from "axios";
import Cookies from "js-cookie";

const todosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/todos`,
});

todosApi.interceptors.request.use((config) => {
  config.headers!["Authorization"] = `Bearer ${Cookies.get("labortoken")}`;
  return config;
});

export default todosApi;
