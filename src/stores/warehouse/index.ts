import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import {
  CreateNewItemData,
  ItemRow,
  Shelve,
  NotificationType,
} from "./constants";

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
    changeShelveModalActive: false,
    changeShelveForm: {
      active: false,
      activeShelve: "",
      newShelve: "",
    },
    changeShelveFetching: false,
    changeShelveItems: [] as string[],
    changeShelveAllowedItems: [] as string[],
    chanageShelveMessage: {
      message: "",
      type: "" as NotificationType,
    },
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
            ? (query += `&shelve=${shelveId}`)
            : (query += `shelve=${shelveId}`);
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

    async fetchProductsOnShelve(shelve: string) {
      this.changeShelveFetching = true;
      const activeShelve = this.shelves.find(
        (o: Shelve) => o.code === shelve
      )?.shelve_id;

      try {
        const response = await axiosInstance(true).get(
          `${endpoints.warehouseItems}?shelve=${activeShelve}`
        );

        if (response.status === 200) {
          const temp: string[] = [];
          response.data.forEach((item: ItemRow) => {
            const barcode = `${item.ticket_id}-${item.name}-${item.category}`;
            temp.push(barcode);
          });
          this.changeShelveAllowedItems = temp;
          this.changeShelveFetching = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async changeItemShevle() {
      try {
        const activeShelve = this.shelves.find(
          (o: Shelve) => o.code === this.changeShelveForm.activeShelve
        )?.shelve_id;
        const newShelve = this.shelves.find(
          (o: Shelve) => o.code === this.changeShelveForm.newShelve
        )?.shelve_id;

        const response = await axiosInstance(true).put(
          endpoints.warehouseChangeShelve,
          {
            barcodes: this.changeShelveItems,
            new_shelve: newShelve,
            shelve: activeShelve,
          }
        );

        if (response.status === 200) {
          this.chanageShelveMessage.type = "Success";
          this.chanageShelveMessage.message =
            "Produkty zostały pomyślnie przeniesione";
          this.clearChangeShelveData();
          setTimeout(() => {
            this.clearNotification();
          }, 2800);
        }
      } catch (error) {
        console.log(error);
        this.chanageShelveMessage.type = "Fail";
        this.chanageShelveMessage.message = `${error}`;
      }
    },

    deleteItemFromChangeShelve(barcode: string) {
      const index = this.changeShelveItems.findIndex((str) => str === barcode);
      this.changeShelveItems.splice(index, 1);
    },

    clearChangeShelveData() {
      this.changeShelveForm = {
        active: false,
        activeShelve: "",
        newShelve: "",
      };
      this.changeShelveItems = [];
      this.changeShelveAllowedItems = [];
    },

    clearNotification() {
      this.chanageShelveMessage.type = "";
      this.chanageShelveMessage.message = "";
    },
  },
});
