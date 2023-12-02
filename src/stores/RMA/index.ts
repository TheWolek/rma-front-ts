import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import { CreateWaybillData, Waybill } from "./constants";

export const useRmaStore = defineStore("RMA", {
  state: () => ({
    rmaPage: {
      ticket_id: 0,
      email: "",
      name: "",
      phone: "",
      device_cat: "",
      device_sn: "",
      device_name: "",
      device_producer: "",
      device_accessories: [] as number[],
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
      result_description: null as string, //string
    },
    waybills: [] as Waybill[],
    editMode: false,
    saving: false,
    shipmentModalActive: false,
    editWaybillModalActive: false,
    addWaybillModalActive: false,
    processModalActive: false,
    waybillEditData: {} as Waybill,
  }),
  getters: {},
  actions: {
    async fetchTicketById(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaPage}?ticketId=${ticketId}`
      );

      if (response.data.length > 0) {
        this.rmaPage = response.data[0];
        return true;
      } else {
        return false;
      }
    },

    async fetchTicketAccessories(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaAccessories}/${ticketId}`
      );

      this.rmaPage.device_accessories = response.data.map(({ id }) => id);
    },

    async fetchTicketWaybills(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaWaybills}?ticketId=${ticketId}`
      );

      this.waybills = response.data;
    },

    async addWaybill(data: CreateWaybillData) {
      this.addWaybillModalActive = false;

      try {
        const response = await axiosInstance(true).post(
          endpoints.rmaWaybills,
          data
        );
        if (response.status === 200) {
          this.fetchTicketWaybills(data.ticket_id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async editWaybill(data: Waybill) {
      this.editWaybillModalActive = false;

      try {
        const response = await axiosInstance(true).put(
          `${endpoints.rmaWaybills}/${data.id}`,
          {
            waybillNumber: data.waybill_number,
            type: data.type,
            status: data.status,
          }
        );

        if (response.status === 200) {
          this.fetchTicketWaybills(data.ticket_id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    toggleModal_editWaybill(newState: boolean, editData?: Waybill) {
      if (editData) {
        this.waybillEditData = editData;
      } else {
        this.waybillEditData = {};
      }

      this.editWaybillModalActive = newState;
    },
  },
});
