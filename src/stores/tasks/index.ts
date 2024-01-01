import { defineStore } from "pinia";
import endpoints from "@/helpers/endpoints";
import axiosInstance from "@/helpers/axiosInstance";
import { Task } from "./constants";

export const useTasksStore = defineStore("Tasks", {
  state: () => ({
    loading: true,
    tasksList: [] as Task[],
  }),
  actions: {
    async fetchTasksList(type: number) {
      try {
        const response = await axiosInstance(true).get(
          `${endpoints.tasks}/${type}`
        );

        if (response.status === 200) {
          this.tasksList = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
