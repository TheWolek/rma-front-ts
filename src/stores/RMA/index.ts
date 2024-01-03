import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import {
  CreateWaybillData,
  Filter,
  Waybill,
  Ticket,
  ChangeTicketStatusData,
} from "./constants";

export const useRmaStore = defineStore("RMA", {
  state: () => ({
    rmaPage: {
      ticket_id: 0,
      barcode: "",
      barcodeURL: "",
      email: "",
      name: "",
      phone: "",
      device_cat: "",
      device_sn: "",
      device_name: "",
      device_producer: "",
      type: 1,
      issue: "",
      status: 0,
      lines: "",
      postCode: "",
      city: "",
      created: "",
      lastStatusUpdate: "",
      inWarehouse: false,
      item_id: null,
      shelve_id: null,
      code: "",
      damage_description: "",
      damage_type: 0,
      result_type: null,
      result_description: null as string, //string
    },
    waybills: [] as Waybill[],
    deviceAccessories: [] as number[],
    editMode: false,
    loadingRmaPage: true,
    shipmentModalActive: false,
    editWaybillModalActive: false,
    addWaybillModalActive: false,
    processModalActive: false,
    waybillEditData: {} as Waybill,
    filtersModalActive: false,
    appliedFilter: {
      active: false,
      filters: [] as Filter[],
    },
    loadingRmaList: false,
    rmaList: [] as Ticket[],
  }),
  getters: {
    getActiveFilters(): Filter[] {
      return this.appliedFilter.filters;
    },
  },
  actions: {
    async fetchTicketById(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaPage}?ticketId=${ticketId}`
      );

      if (response.data !== undefined) {
        this.rmaPage = response.data;
        return true;
      } else {
        return false;
      }
    },

    async fetchTicketAccessories(ticketId: number) {
      const response = await axiosInstance(true).get(
        `${endpoints.rmaAccessories}/${ticketId}`
      );

      this.deviceAccessories = response.data.map(({ id }) => id);
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
          this.fetchTicketWaybills(data.ticketId);
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

    async changeTicketStatus(data: ChangeTicketStatusData) {
      this.loadingRmaPage = true;
      try {
        const response = await axiosInstance(true).put(
          `${endpoints.rmaChangeStatus}/${data.ticketId}`,
          { status: data.status }
        );

        if (response.status === 200) {
          this.fetchTicketById(data.ticketId);
          this.fetchTicketAccessories(data.ticketId);
          this.loadingRmaPage = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async saveTicketData() {
      this.loadingRmaPage = true;
      try {
        const response = await axiosInstance(true).put(
          `${endpoints.rmaEdit}/${this.rmaPage.ticket_id}`,
          {
            email: this.rmaPage.email,
            name: this.rmaPage.name,
            phone: this.rmaPage.phone,
            type: this.rmaPage.type,
            deviceSn: this.rmaPage.device_sn,
            issue: this.rmaPage.issue,
            lines: this.rmaPage.lines,
            postCode: this.rmaPage.postCode,
            city: this.rmaPage.city,
            damage_type: this.rmaPage.damage_type,
            damage_description: this.rmaPage.damage_description,
            result_type: this.rmaPage.result_type,
            result_description: this.rmaPage.result_description,
          }
        );

        if (response.status === 200) {
          this.fetchTicketById(this.rmaPage.ticket_id);
          this.fetchTicketAccessories(this.rmaPage.ticket_id);
          this.loadingRmaPage = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async registerDeviceInWarehouse(ticketId: number) {
      try {
        const response = await axiosInstance(true).put(
          `${endpoints.rmaRegisterItem}/${ticketId}`
        );

        if (response.status === 200) {
          this.rmaPage.inWarehouse = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    setFilters(newFilters: Filter[]) {
      this.appliedFilter.filters = newFilters;
      this.appliedFilter.active = true;
    },

    clearAllFilters() {
      this.appliedFilter.filters = [];
      this.appliedFilter.active = false;
    },

    clearFilter(filterToDelete: Filter) {
      this.appliedFilter.filters = this.appliedFilter.filters.filter(
        (filter: Filter) => filter.name !== filterToDelete.name
      );
    },

    async fetchTicketListByFilters() {
      this.loadingRmaList = true;
      if (this.appliedFilter.filters.length === 0) {
        this.appliedFilter.active = false;
        this.rmaList = [];
        this.loadingRmaList = false;
        return;
      }
      let url = `${endpoints.rmaList}?`;
      const filters: Filter[] = this.appliedFilter.filters;
      let q = 0;

      filters.forEach((filter) => {
        if (filter.name === "zgłoszenie") {
          url += `ticketId=${filter.value}`;
          q++;
        }
        if (filter.name === "list") {
          if (q > 0) url += "&";
          url += `waybill=${filter.value}`;
          q++;
        }
        if (filter.name === "status") {
          if (q > 0) url += "&";
          url += `status=${filter.value}`;
          q++;
        }
        if (filter.name === "typ") {
          if (q > 0) url += "&";
          url += `type=${filter.value}`;
          q++;
        }
        if (filter.name === "sn") {
          if (q > 0) url += "&";
          url += `sn=${filter.value}`;
          q++;
        }
        if (filter.name === "producent") {
          if (q > 0) url += "&";
          url += `deviceProducer=${filter.value}`;
          q++;
        }
      });

      try {
        const response = await axiosInstance(true).get(url);

        if (response.status === 200) {
          this.rmaList = response.data;
        }

        this.loadingRmaList = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
