import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../hook/useAuth";

const { token: tokenCookie } = parseCookies();

const api = axios.create({
  baseURL: "http://127.0.0.0:3333",
  headers: {
    authorization: `Bearer ${tokenCookie}`,
  },
});

api.interceptors.response.use(
  (success) => success,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      signOut();
    }

    return Promise.reject(error);
  }
);
export default api;
