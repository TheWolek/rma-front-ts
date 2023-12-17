import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import { CreateNewItemData } from "./constants";

export const useWarehouseStore = defineStore("Warehouse", {
  state: () => ({
    createModalActive: false,
  }),
  actions: {
    async createNewItem(itemData: CreateNewItemData) {
      try {
        const response = await axiosInstance(true).post(
          endpoints.warehouseCreateItem,
          itemData
        );

        if (response.status === 200) {
          console.log();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
