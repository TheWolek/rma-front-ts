<script setup lang="ts">
import { onMounted } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { useWarehouseStore } from "@/stores/warehouse";
import TasksList from "./TasksList.vue";
import { storeToRefs } from "pinia";

const store = useTasksStore();
const warehouseStore = useWarehouseStore();
const { tasksList } = storeToRefs(store);

onMounted(async () => {
  await warehouseStore.fetchShelves();
  await store.fetchTasksList(1);
});
</script>
<template>
  <div class="warehouseTasksMove_wrap">
    <h1>Zadania przeniesienia</h1>
    <TasksList :list="tasksList" />
  </div>
</template>
<style>
.warehouseTasksMove_wrap {
  padding: 0.5em;
}
</style>
