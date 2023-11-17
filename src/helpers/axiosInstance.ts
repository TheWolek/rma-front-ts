import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";

export default (requiresAuth = true) => {
  const options: { baseURL: string; headers: { Authorization?: string } } = {
    baseURL: "http://localhost:3000/",
    headers: {},
  };

  if (requiresAuth) {
    options.headers.Authorization = Cookies.get("authToken");
  }

  const instance = axios.create(options);

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.code === "ERR_NETWORK") {
        return error;
      }
      if (error.response.status === 401) {
        Cookies.remove("authToken");
        router.push("/logowanie");
        return;
      }

      if (error.response.status === 500) {
        console.log(error);
        return error;
      }

      return error.response;
    }
  );

  return instance;
};
