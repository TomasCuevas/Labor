import axios from "axios";
import Cookies from "js-cookie";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
});

authApi.interceptors.request.use((config) => {
  config.headers!["Authorization"] = `Bearer ${Cookies.get("labortoken")}`;
  return config;
});

export default authApi;
