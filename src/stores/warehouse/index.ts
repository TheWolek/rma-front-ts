import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import { CreateNewItemData, ItemRow, Shelve } from "./constants";

export const useWarehouseStore = defineStore("Warehouse", {
  state: () => ({
    createModalActive: false,
    loadingItemsList: false,
    filters: {
      barcode: "",
      shelve: "",
    },
    itemsList: [] as ItemRow[],
    shelves: [] as Shelve[],
  }),
  actions: {
    async fetchShelves() {
      try {
        const response = await axiosInstance(true).get(
          endpoints.warehouseShelves
        );

        if (response.status === 200) {
          this.shelves = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

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

    async fetchByFilters() {
      this.loadingItemsList = true;
      let query = "?";

      if (this.filters.barcode) {
        query += `barcode=${this.filters.barcode}`;
      }

      if (this.filters.shelve) {
        const shelveId = this.shelves.find(
          (shelve) => shelve.code === this.filters.shelve
        )?.shelve_id;

        if (shelveId !== undefined) {
          this.filters.barcode
            ? (query += `&shelve=${this.filters.shelve}`)
            : (query += `shelve=${this.filters.shelve}`);
        }
      }

      try {
        const response = await axiosInstance(true).get(
          `${endpoints.warehouseItems}${query}`
        );

        if (response.status === 200) {
          this.itemsList = response.data;
          this.loadingItemsList = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
