import axios from "axios";
import Cookies from "js-cookie";

const searchApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/search`,
});

searchApi.interceptors.request.use((config) => {
  config.headers!["Authorization"] = `Bearer ${Cookies.get("labortoken")}`;
  return config;
});

export default searchApi;
