import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import { CollectItem, CollectStatus, Collect } from "./constants";

export const useCollectStore = defineStore("CollectStore", {
  state: () => ({
    loadingCollectPage: true,
    collectPage: {
      id: 0,
      ref_name: "",
      created: "",
      status: "" as CollectStatus,
    },
    collectItems: [] as CollectItem[],
    waybillError: "",
    collectList: [] as Collect[],
    loadingCollectList: false,
    filter: {
      refName: "",
      created: "",
      status: null as CollectStatus,
    },
  }),
  actions: {
    async fetchCollectById(collectId: number) {
      this.loadingCollectPage = true;
      const response = await axiosInstance(true).get(
        `${endpoints.collectPackages}/${collectId}`
      );

      if (response.data !== undefined) {
        this.collectPage = {
          id: response.data.id,
          ref_name: response.data.ref_name,
          created: response.data.created,
          status: response.data.status,
        };
        this.collectItems = response.data.items;
        this.loadingCollectPage = false;
        return true;
      } else {
        this.loadingCollectPage = false;
        return false;
      }
    },

    async addNewItemToList(waybill: string) {
      this.loadingCollectPage = true;
      try {
        const response = await axiosInstance(true).post(
          `${endpoints.collectPackageItems}/${this.collectPage.id}/add`,
          {
            waybill,
          }
        );

        if (response.status === 200) {
          this.fetchCollectById(this.collectPage.id);
        } else {
          this.waybillError = response.data.message;
        }

        this.loadingCollectPage = false;
      } catch (error) {
        console.log(error);
      }
    },

    async finishCollect() {
      this.loadingCollectPage = true;
      try {
        const response = await axiosInstance(true).put(
          `${endpoints.collectPackages}/${this.collectPage.id}`
        );

        if (response.status === 200) {
          this.fetchCollectById(this.collectPage.id);
        }

        this.loadingCollectPage = false;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCollectListByFilters() {
      this.loadingCollectList = true;
      let query = "?";

      if (this.filter.refName !== "") {
        query += `refName=${this.filter.refName}`;
      }

      if (this.filter.created !== "") {
        if (this.filter.refName !== "") {
          query += "&";
        }
        query += `created=${this.filter.created}`;
      }

      if (this.filter.status !== null) {
        if (this.filter.refName !== "" || this.filter.created !== "") {
          query += "&";
        }

        query += `status=${this.filter.status}`;
      }

      try {
        const response = await axiosInstance(true).get(
          `${endpoints.collectPackages}${query}`
        );

        if (response.status === 200) {
          this.collectList = response.data;
          this.loadingCollectList = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
