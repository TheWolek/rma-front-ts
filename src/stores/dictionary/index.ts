import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import { DictionaryItem } from "./constants";

export const useDictionaryStore = defineStore("Dictionary", {
  state: () => ({
    dictionaries: [
      {
        id: 1,
        name: "accessoriesTypes",
        displayName: "Typy akcesoriów",
        url: endpoints.rmaDictionaryAccessoriesTypes,
        mutation: "setAccessoriesTypes",
        items: [] as DictionaryItem[],
      },
      {
        id: 2,
        name: "damageTypes",
        displayName: "Typy stanu urządzenia",
        url: endpoints.rmaDictionaryDamageTypes,
        mutation: "setDamageTypes",
        items: [],
      },
      {
        id: 3,
        name: "statusesTypes",
        displayName: "Statusy zgłoszeń",
        url: endpoints.rmaDictionaryStatusesTypes,
        mutation: "setStatusesTypes",
        items: [],
      },
      {
        id: 4,
        name: "resultTypes",
        displayName: "Typy rezultatów zgłoszeń",
        url: endpoints.rmaDictionaryResultTypes,
        mutation: "setResultTypes",
        items: [],
      },
    ],
  }),
  getters: {
    findDictionaryByName: (state) => (name: string) => {
      if (typeof name !== "string") {
        return false;
      }
      return (
        state.dictionaries.find(
          (d) => d.name.toLowerCase() === name.toLowerCase()
        ) || false
      );
    },
    getDictionaryByName: (state) => (name: string) =>
      state.dictionaries.find(
        (d) => d.name.toLowerCase() === name.toLowerCase()
      ),
  },
  actions: {
    async fetchDictionary(dict) {
      const response = await axiosInstance(true).get(dict.url);

      this.dictionaries.find((d) => d.id === dict.id).items = response.data;
    },
  },
});
