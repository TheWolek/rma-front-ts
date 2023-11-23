import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";

export const useRmaStore = defineStore("RMA", {
  state: () => ({
    rmaPage: {
      ticketId: 0,
      email: "",
      name: "",
      phone: "",
      device_cat: "",
      device_sn: "",
      device_name: "",
      device_producer: "",
      device_accessories: [0],
      type: 1,
      issue: "",
      status: 0,
      lines: "",
      postCode: "",
      city: "",
      created: "",
      lastStatusUpdate: "",
      inWarehouse: 0,
      item_id: null,
      shelve_id: null,
      code: "",
      damage_description: "",
      damage_type: 0,
      result_type: null,
      result_description: null, //string
    },
  }),
  getters: {},
  actions: {
    async fetchTicketById(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaPage}?ticketId=${ticketId}`
      );

      this.rmaPage = response.data[0];
    },

    async fetchTicketAccessories(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaAccessories}/${ticketId}`
      );

      this.rmaPage.device_accessories = response.data.map(({ id }) => id);
    },
  },
});
