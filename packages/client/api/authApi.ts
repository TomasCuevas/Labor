import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("labortoken") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
});

export default authApi;
