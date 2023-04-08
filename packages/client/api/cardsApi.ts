import axios from "axios";
import Cookies from "js-cookie";

const cardsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/cards`,
});

cardsApi.interceptors.request.use((config) => {
  config.headers!["Authorization"] = `Bearer ${Cookies.get("labortoken")}`;
  return config;
});

export default cardsApi;
