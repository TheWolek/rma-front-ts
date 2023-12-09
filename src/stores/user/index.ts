import { defineStore } from "pinia";
import Cookies from "js-cookie";
import decodeToken from "@/helpers/decodeToken";
import router from "@/router";

export const useUserStore = defineStore("User", {
  state: () => ({
    isLoggedIn: false,
    userRole: "",
  }),
  actions: {
    login(token: string) {
      Cookies.set("authToken", `Bearer ${token}`);
      const { userRole } = decodeToken();
      this.userRole = userRole;
      this.isLoggedIn = true;
    },
    logout() {
      this.userRole = "";
      this.isLoggedIn = false;
      Cookies.remove("authToken");
    },
    tryToLogin() {
      const cookie = Cookies.get("authToken");
      if (cookie) {
        const { userRole } = decodeToken();
        this.userRole = userRole;
        this.isLoggedIn = true;
      } else {
        router.push("/");
        this.userRole = "";
        this.isLoggedIn = false;
        Cookies.remove("authToken");
      }
    },
  },
});
