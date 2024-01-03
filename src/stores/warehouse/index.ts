import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import {
  CreateNewItemData,
  ItemRow,
  Shelve,
  NotificationType,
  DataFromMoveTask,
  ChangeItemShelveData,
  RemoveItemData,
} from "./constants";
import { TaskItem } from "../tasks/constants";

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
    changeShelveMessage: {
      message: "",
      type: "" as NotificationType,
    },
    taskListActive: false,
    taskList: [] as TaskItem[],
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
          this.changeShelveAllowedItems = response.data.map(
            (item: ItemRow) => item.barcode
          );
          this.changeShelveFetching = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async changeItemShevle(props?: ChangeItemShelveData) {
      await this.fetchShelves();
      try {
        const from: string = props?.from ?? this.changeShelveForm.activeShelve;
        const to: string = props?.to ?? this.changeShelveForm.newShelve;

        const activeShelve: number = this.shelves.find(
          (o: Shelve) => o.code === from
        )?.shelve_id;
        const newShelve: number = this.shelves.find(
          (o: Shelve) => o.code === to
        )?.shelve_id;

        console.log(from, activeShelve);

        const response = await axiosInstance(true).put(
          endpoints.warehouseChangeShelve,
          {
            barcodes: props?.item ?? this.changeShelveItems,
            new_shelve: newShelve,
            shelve: activeShelve,
          }
        );

        if (response.status === 200) {
          this.changeShelveMessage.type = "Success";
          this.changeShelveMessage.message =
            "Produkty zostały pomyślnie przeniesione";
          this.clearChangeShelveData();
          setTimeout(() => {
            this.clearNotification();
          }, 2800);
        }
      } catch (error) {
        console.log(error);
        this.changeShelveMessage.type = "Fail";
        this.changeShelveMessage.message = `${error}`;
      }
    },

    async removeItem(props: RemoveItemData) {
      try {
        const response = await axiosInstance(true).delete(
          endpoints.warehouseItems,
          {
            data: props,
          }
        );

        if (response.status === 200) {
          return true;
        }
      } catch (error) {
        console.log(error);
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
      this.taskList = [];
      this.taskListActive = false;
    },

    clearNotification() {
      this.changeShelveMessage.type = "";
      this.changeShelveMessage.message = "";
    },

    async setDataFromMoveTask(data: DataFromMoveTask) {
      try {
        const response = await axiosInstance(true).get(
          `${endpoints.tasks}/${data.taskName}/tasks`
        );

        if (response.status === 200) {
          this.changeShelveForm = {
            active: true,
            activeShelve: data.from,
            newShelve: data.to,
          };

          this.taskListActive = true;
          this.taskList = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
