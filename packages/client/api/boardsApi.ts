import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("labortoken") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const boardsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/boards`,
});

export default boardsApi;
