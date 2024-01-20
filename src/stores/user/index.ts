import { defineStore } from "pinia";
import Cookies from "js-cookie";
import decodeToken from "@/helpers/decodeToken";
import router from "@/router";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import { User } from "./constants";

export const useUserStore = defineStore("User", {
  state: () => ({
    isLoggedIn: false,
    userRole: "",
    userLogin: "",
    addUserModalActive: false,
    loadingUsersList: false,
    loadingUserDetails: false,
    deleteDialogActive: false,
    filterLogin: "",
    userList: [] as User[],
    userDetails: {} as User,
  }),
  actions: {
    login(token: string) {
      Cookies.set("authToken", `Bearer ${token}`);
      const { userRole, userLogin } = decodeToken();
      this.userRole = userRole;
      this.userLogin = userLogin;
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
        const { userRole, userLogin } = decodeToken();
        this.userRole = userRole;
        this.userLogin = userLogin;
        this.isLoggedIn = true;
      } else {
        router.push("/");
        this.userRole = "";
        this.isLoggedIn = false;
        Cookies.remove("authToken");
      }
    },
    async fetchByFilters() {
      this.loadingItemsList = true;
      let query = "?";

      if (this.filterLogin) {
        query += `login=${this.filterLogin}`;
      }

      try {
        const response = await axiosInstance(true).get(
          `${endpoints.users}${query}`
        );

        if (response.status === 200) {
          this.userList = response.data;
          this.loadingItemsList = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchByID(userId: number) {
      this.loadingUserDetails = true;

      try {
        const response = await axiosInstance(true).get(
          `${endpoints.users}/${userId}`
        );

        if (response.status === 200) {
          this.userDetails = response.data;
          this.loadingUserDetails = false;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      this.loadingUserDetails = true;

      try {
        const response = await axiosInstance(true).put(
          `${endpoints.users}/${this.userDetails.user_id}`,
          {
            change_password: this.userDetails.change_password,
            role: this.userDetails.role,
          }
        );

        if (response.status === 200) {
          this.fetchByID(this.userDetails.user_id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser() {
      this.loadingUserDetails = true;

      try {
        const response = await axiosInstance(true).delete(
          `${endpoints.users}/${this.userDetails.user_id}`
        );

        if (response.status === 200) {
          router.push({ name: "usersList" });
          this.fetchByFilters();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
