import { defineStore } from "pinia";
import { CreateTicketData } from "../RMA/constants";

export const useClientStore = defineStore("Client", {
  state: () => ({
    addFormData: {
      firstStep: {
        deviceCategory: "",
        deviceProducer: "",
        deviceName: "",
        deviceSn: "",
      },
      secondStep: {
        type: "1",
        issue: "",
      },
      thirdStep: {
        name: "",
        phone: "",
        email: "",
      },
      addressSection: {
        lines: "",
        postCode: "",
        city: "",
      },
    } as CreateTicketData,
  }),
  actions: {
    clearAddFormData() {
      this.addFormData = {
        firstStep: {
          deviceCategory: "",
          deviceProducer: "",
          deviceName: "",
          deviceSn: "",
        },
        secondStep: {
          type: "1",
          issue: "",
        },
        thirdStep: {
          name: "",
          phone: "",
          email: "",
        },
        addressSection: {
          lines: "",
          postCode: "",
          city: "",
        },
      };
    },
  },
});
